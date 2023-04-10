import { AnyPrincipal, Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { BlockPublicAccess, Bucket, BucketEncryption, BucketProps } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

/**
 * Static S3 bucket configuration that disallows public access
 * not explicitly allowed by resource policies.
 */
export class SecureBlockPublicAccess extends BlockPublicAccess {
  public constructor() {
    super({
      blockPublicAcls: true,
      blockPublicPolicy: true,
      ignorePublicAcls: true,
      restrictPublicBuckets: true
    });
  }
}

/**
 * S3 bucket properties that apply the following security baseline:
 * - Block public access not explicitly allowed by resource policies
 * - Require bucket encryption
 */
export interface SecureBucketProps extends BucketProps {
  /** Public access configuration. Statically set to block public access by default. */
  readonly blockPublicAccess?: SecureBlockPublicAccess;

  /** Which type of bucket encryption to use. */
  readonly encryption: BucketEncryption.KMS | BucketEncryption.KMS_MANAGED | BucketEncryption.S3_MANAGED;

  /** Whether public read access to bucket contents is enabled. Statically set to false. */
  readonly publicReadAccess?: false;
}

/**
 * S3 bucket that applies the following security baseline:
 * - Block public access by default
 * - Require bucket encryption to be enabled
 * - Require encryption of uploaded objects
 * - Require API requests to be over encrypted connections (eg. HTTPS)
 */
export class SecureBucket extends Bucket {
  public constructor(scope: Construct, id: string, props: SecureBucketProps) {
    super(scope, id, {
      ...props,
      blockPublicAccess: new SecureBlockPublicAccess()
    });

    this.denyInsecureTransport();
    this.denyUnencryptedObjectUploads();
  }

  // By default, deny requests to bucket resources made over unencrypted connections
  // Ref: https://aws.amazon.com/blogs/security/how-to-use-bucket-policies-and-apply-defense-in-depth-to-help-secure-your-amazon-s3-data/
  private denyInsecureTransport(): void {
    this.addToResourcePolicy(new PolicyStatement({
      actions: ['s3:*'],
      conditions: {
        Bool: { 'aws:SecureTransport': 'false' }
      },
      effect: Effect.DENY,
      principals: [new AnyPrincipal()],
      resources: [this.arnForObjects('*')]
    }));
  }

  // Deny publishing unencrypted objects to the S3 bucket
  // Ref: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingServerSideEncryption.html
  private denyUnencryptedObjectUploads(): void {
    this.addToResourcePolicy(new PolicyStatement({
      actions: ['s3:PutObject'],
      conditions: {
        Null: { 's3:x-amz-server-side-encryption': 'true' }
      },
      effect: Effect.DENY,
      principals: [new AnyPrincipal()],
      resources: [this.arnForObjects('*')]
    }));
  }
}

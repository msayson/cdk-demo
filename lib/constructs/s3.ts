import { AnyPrincipal, Effect, PolicyStatement } from '@aws-cdk/aws-iam'
import { BlockPublicAccess, Bucket, BucketEncryption, BucketPolicy, BucketProps } from '@aws-cdk/aws-s3';
import { Construct } from '@aws-cdk/core';

// Disallows default public access to instances of SecureBucket
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

// Applies a security baseline to user-defined properties for SecureBucket
export interface SecureBucketProps extends BucketProps {
  // Do not allow public access to buckets by default
  readonly blockPublicAccess?: SecureBlockPublicAccess;

  // Require that some form of bucket encryption is used
  readonly encryption: BucketEncryption.KMS | BucketEncryption.KMS_MANAGED | BucketEncryption.S3_MANAGED;

  // Do not allow public read access to bucket contents
  readonly publicReadAccess?: false;
}

// Applies a security baseline to S3 buckets created as instances of this class
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
        Null: { 's3::x-amz-server-side-encryption': 'true' }
      },
      effect: Effect.DENY,
      principals: [new AnyPrincipal()],
      resources: [this.arnForObjects('*')]
    }));
  }
}

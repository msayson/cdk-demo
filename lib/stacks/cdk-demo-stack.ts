import { Stack, StackProps } from 'aws-cdk-lib';
import { BucketEncryption } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

import { SecureBucket } from '../constructs/s3';

export class CdkDemoStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    new SecureBucket(this, 'DemoS3Bucket', {
      encryption: BucketEncryption.S3_MANAGED
    });
  }
}

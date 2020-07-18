import { BucketEncryption } from '@aws-cdk/aws-s3';
import { Construct, Stack, StackProps } from '@aws-cdk/core';

import { SecureBucket } from '../constructs/s3';

export class CdkDemoStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new SecureBucket(this, 'DemoS3Bucket', {
      bucketName: 'some-unique-bucket-name',
      encryption: BucketEncryption.S3_MANAGED
    });
  }
}

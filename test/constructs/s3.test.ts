import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Effect } from 'aws-cdk-lib/aws-iam';
import { BucketEncryption } from 'aws-cdk-lib/aws-s3';

import { SecureBucket, SecureBucketProps } from '../../lib/constructs/s3';

const app: App = new App();
const stack: Stack = new Stack(app, 'TestStack');

describe('SecureBucket', () => {
  describe('constructor', () => {
    it('creates a bucket with restricted access policies', () => {
      const bucketName: string = 'bucket-name';
      const bucketProps: SecureBucketProps = {
        bucketName: bucketName,
        encryption: BucketEncryption.S3_MANAGED
      };

      new SecureBucket(stack, 'TestBucket', bucketProps);

      const bucketCfnId: string = 'TestBucket560B80BC';
      const cfnGetAttForBucketArn = { 'Fn::GetAtt': [bucketCfnId, 'Arn'] };
      const cfnResourceForBucketObjects = { 'Fn::Join': ['', [cfnGetAttForBucketArn, '/*']] };

      Template.fromStack(stack).hasResourceProperties('AWS::S3::Bucket', {
        BucketEncryption: {
          ServerSideEncryptionConfiguration: [
            {
              ServerSideEncryptionByDefault: { SSEAlgorithm: 'AES256' }
            }
          ]
        },
        BucketName: bucketName,
        PublicAccessBlockConfiguration: {
          BlockPublicAcls: true,
          BlockPublicPolicy: true,
          IgnorePublicAcls: true,
          RestrictPublicBuckets: true
        }
      });

      Template.fromStack(stack).hasResourceProperties('AWS::S3::BucketPolicy', {
        Bucket: { Ref: bucketCfnId },
        PolicyDocument: {
          Statement: [
            {
              Action: 's3:*',
              Condition: { Bool: { 'aws:SecureTransport': 'false' } },
              Effect: Effect.DENY,
              Principal: { AWS: '*' },
              Resource: cfnResourceForBucketObjects
            },
            {
              Action: 's3:PutObject',
              Condition: { Null: { 's3:x-amz-server-side-encryption': 'true' } },
              Effect: Effect.DENY,
              Principal: { AWS: '*' },
              Resource: cfnResourceForBucketObjects
            }
          ],
          Version: '2012-10-17'
        }
      });
    });
  });
});

import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

import { CdkDemoStack } from '../../lib/stacks/cdk-demo-stack';

describe('CdkDemoStack', () => {
  const app: App = new App();

  describe('constructor', () => {
    it('successfully creates a stack with a S3 bucket', () => {
      const stack: CdkDemoStack = new CdkDemoStack(app, 'MyTestStack');
      Template.fromStack(stack).resourceCountIs('AWS::S3::Bucket', 1);
    });
  });
});

import { expect as expectCDK, haveResource } from '@aws-cdk/assert';
import { App } from '@aws-cdk/core';

import { CdkDemoStack } from '../../lib/stacks/cdk-demo-stack';

describe('CdkDemoStack', () => {
  const app: App = new App();

  describe('constructor', () => {
    it('successfully creates a stack with a S3 bucket', () => {
      const stack: CdkDemoStack = new CdkDemoStack(app, 'MyTestStack');
      expectCDK(stack).to(haveResource('AWS::S3::Bucket'));
    });
  });
});

import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import { App } from '@aws-cdk/core';

import { CdkDemoStack } from '../../lib/stacks/cdk-demo-stack';

test('Empty Stack', () => {
  const app = new App();
  const stack = new CdkDemoStack(app, 'MyTestStack');

  expectCDK(stack).to(matchTemplate({
    "Resources": {}
  }, MatchStyle.EXACT))
});

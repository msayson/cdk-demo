#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';

import { CdkDemoStack } from '../lib/stacks/cdk-demo-stack';

const app = new App();
new CdkDemoStack(app, 'CdkDemoStack');

#!/usr/bin/env node
import 'source-map-support/register';
import { App } from '@aws-cdk/core';

import { CdkDemoStack } from '../lib/cdk-demo-stack';

const app = new App();
new CdkDemoStack(app, 'CdkDemoStack');

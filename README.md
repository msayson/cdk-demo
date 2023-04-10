# Summary

This is a demo project working with the Amazon Cloud Development Kit (CDK) in TypeScript.

For more information on working with the CDK, see the [CDK developer guide](https://docs.aws.amazon.com/cdk/latest/guide/home.html).

## Developer set-up

* Install [Node JS](https://nodejs.org).
* Install the AWS CDK and TypeScript, eg. `npm install -g aws-cdk && npm install -g typescript`.
* Git clone this package and run `npm install`.
* Run `npm test` and verify that the build succeeds.
* Install the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).
* Set up your [AWS CLI environment](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) to enable deploying CDK stacks to your AWS account.
* Run `cdk deploy` to deploy the demo stack to your AWS account.

## Useful commands

* `cdk bootstrap`   create resources required to deploy CDK stacks via an automatically generated AWS CloudFormation "bootstrap" stack
* `cdk deploy`      deploy CDK stacks to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emit the synthesized CloudFormation template
* `npm run test:clean` clear the jest test cache
* `npm run watch`   watch for changes and compile
* `npm test`        run jest unit tests

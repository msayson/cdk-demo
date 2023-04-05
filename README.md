# Summary

This is a demo project working with the Amazon Cloud Development Kit (CDK) in TypeScript.

For more information on working with the CDK, see the [CDK developer guide](https://docs.aws.amazon.com/cdk/latest/guide/home.html).

## Developer set-up

* Install [Node JS](https://nodejs.org). This project uses Node JS v16.
* Install the AWS CDK and TypeScript, eg. `npm install -g aws-cdk && npm install -g typescript`.
* Git clone this package and run `npm install`.
* Run `npm test` and verify that the build succeeds.

## Useful commands

* `cdk bootstrap`   create a AWS CloudFormation "bootstrap" stack with prerequisite resources needed before you can deploy your CDK stacks
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
* `npm run build`   compile typescript to js
* `npm run test`    run jest unit tests
* `npm run test:clean` clear the jest test cache
* `npm run watch`   watch for changes and compile

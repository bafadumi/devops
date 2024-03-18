#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DevopssStack } from '../lib/devopss-stack';
import { PipelineStack } from './../lib/pipeline';

const app = new cdk.App();

new PipelineStack(app, 'MyPipelineStack', {
  env: {
    account: '381492192118',
    region: 'us-east-1',
  },
});

app.synth();
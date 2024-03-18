import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';

const GITHUB_SOURCE_REPO = 'bafadumi/devops';

const CDK_OUT_DIRECTORY = './devopss/cdk.out/'
export class PipelineStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const pipeline = new CodePipeline(this, 'Pipeline', {
            pipelineName: 'DevOpsAssignmentPipeline',
            synth: new ShellStep('Synth', {
                input: CodePipelineSource.gitHub(GITHUB_SOURCE_REPO, 'main', {
                    authentication: cdk.SecretValue.secretsManager('my-secret-token'),
                }),
                commands: ['npm ci', 'npm run build'],
                primaryOutputDirectory: CDK_OUT_DIRECTORY,
            }),
        });
    }
} 
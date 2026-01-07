import { Injectable } from '@nestjs/common';
import inquirer from 'inquirer';
import {
  CICDConfig,
  CloudConfig,
  ProjectConfig,
  NotificationConfig,
  NotificationPlatform,
} from '../interfaces/config.interface';
import { ValidationService } from './validation.service';

@Injectable()
export class PromptService {
  constructor(private readonly validationService: ValidationService) {}

  async collectAllConfigurations(): Promise<CICDConfig> {
    const projectConfig = await this.collectProjectConfig();
    const cloudConfig = await this.collectCloudConfig();
    const notificationConfig = await this.collectNotificationConfig();
    const jenkinsConfig = await this.collectJenkinsConfig();
    return {
      project: projectConfig,
      cloud: cloudConfig,
      notifications: notificationConfig,
      jenkinsConfig,
    };
  }

  private async collectProjectConfig(): Promise<ProjectConfig> {
    const answers: Partial<ProjectConfig> = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Enter your project name:',
        default: 'my-project',
        validate: (input) => input.length > 0 || 'Project name is required',
      },
      {
        type: 'list',
        name: 'projectType',
        message: 'Select project type',
        choices: ['frontend', 'backend', 'fullstack'],
      },
      {
        type: 'list',
        name: 'language',
        message: 'Select programming language',
        choices: ['javascript', 'typescript'],
      },
      {
        type: 'input',
        name: 'repository',
        message: 'Enter Git repository URL:',
        validate: (input) => {
          try {
            return (
              this.validationService.validateGitRepository(input) ||
              'Invalid Git repository URL'
            );
          } catch (error) {
            return error.message;
          }
        },
      },
      {
        type: 'input',
        name: 'branch',
        message: 'Enter branch name to deploy:',
        default: 'master',
      },
      {
        type: 'confirm',
        name: 'hasDockerfile',
        message: 'Does your project have a Dockerfile?',
        default: true,
      },
    ]);

    if (answers.hasDockerfile) {
      const dockerConfig = await inquirer.prompt([
        {
          type: 'input',
          name: 'dockerfilePath',
          message: 'Enter Dockerfile path (relative to project root):',
          default: './Dockerfile',
        },
      ]);
      answers.dockerfilePath = dockerConfig.dockerfilePath;
      await this.validationService.validateDockerfile(answers.dockerfilePath!);
    }

    const buildAnswers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'runTests',
        message: 'Do you want to run tests during pipeline?',
        default: true,
      },
    ]);

    answers.runTests = buildAnswers.runTests;

    if (answers.runTests) {
      const testCommand = await inquirer.prompt([
        {
          type: 'input',
          name: 'testCommand',
          message: 'Enter test command:',
          default: 'npm test',
        },
      ]);
      answers.testCommand = testCommand.testCommand;
    }

    const buildConfig = await inquirer.prompt([
      {
        type: 'input',
        name: 'buildCommand',
        message: 'Enter build command:',
        default:
          answers.language === 'typescript' ? 'npm run build' : 'npm run build',
      },
    ]);
    answers.buildCommand = buildConfig.buildCommand;

    return answers as ProjectConfig;
  }

  private async collectCloudConfig(): Promise<CloudConfig> {
    const providerAnswer = await inquirer.prompt([
      {
        type: 'list',
        name: 'provider',
        message: 'Select cloud provider:',
        choices: ['aws', 'azure', 'gcp', 'digitalocean'],
      },
    ]);

    const provider = providerAnswer.provider;
    let credentials: any;

    switch (provider) {
      case 'aws':
        credentials = await this.collectAWSCredentials();
        break;
      case 'azure':
        credentials = await this.collectAzureCredentials();
        break;
      case 'gcp':
        credentials = await this.collectGCPCredentials();
        break;
      case 'digitalocean':
        credentials = await this.collectDOCredentials();
        break;
    }
    const deploymentConfig = await this.collectDeploymentConfig(provider);
    return {
      provider,
      credentials,
      region: credentials.region,
      instanceType: deploymentConfig.instanceType,
      deploymentConfig: deploymentConfig.config,
    };
  }
  private async collectAWSCredentials() {
    return await inquirer.prompt([
      {
        type: 'input',
        name: 'accessKeyId',
        message: 'Enter AWS Access Key ID:',
        validate: (input) => input.length > 0 || 'Access Key ID is required',
      },
      {
        type: 'password',
        name: 'secretAccessKey',
        message: 'Enter AWS Secret Access Key:',
        mask: '*',
        validate: (input) =>
          input.length > 0 || 'Secret Access Key is required',
      },
      {
        type: 'list',
        name: 'region',
        message: 'Select AWS region:',
        choices: [
          'us-east-1',
          'us-west-2',
          'eu-west-1',
          'ap-south-1',
          'ap-southeast-1',
        ],
      },
    ]);
  }

  private async collectAzureCredentials() {
    return await inquirer.prompt([
      {
        type: 'input',
        name: 'subscriptionId',
        message: 'Enter Azure Subscription ID:',
      },
      {
        type: 'input',
        name: 'clientId',
        message: 'Enter Azure Client ID:',
      },
      {
        type: 'password',
        name: 'clientSecret',
        message: 'Enter Azure Client Secret:',
        mask: '*',
      },
      {
        type: 'input',
        name: 'tenantId',
        message: 'Enter Azure Tenant ID:',
      },
      {
        type: 'list',
        name: 'region',
        message: 'Select Azure region:',
        choices: [
          'eastus',
          'westus',
          'centralus',
          'westeurope',
          'southeastasia',
        ],
      },
    ]);
  }

  private async collectGCPCredentials() {
    return await inquirer.prompt([
      { type: 'input', name: 'projectId', message: 'Enter GCP Project ID:' },
      {
        type: 'input',
        name: 'keyFile',
        message: 'Enter path to GCP service account key file:',
        validate: (input) => input.length > 0 || 'Key file path is required',
      },
      {
        type: 'list',
        name: 'region',
        message: 'Select GCP region:',
        choices: [
          'us-central1',
          'us-east1',
          'europe-west1',
          'asia-south1',
          'asia-southeast1',
        ],
      },
    ]);
  }

  private async collectDOCredentials() {
    return await inquirer.prompt([
      {
        type: 'password',
        name: 'apiToken',
        message: 'Enter DigitalOcean API Token:',
        mask: '*',
        validate: (input) => input.length > 0 || 'API Token is required',
      },
      {
        type: 'list',
        name: 'region',
        message: 'Select DigitalOcean region:',
        choices: ['nyc1', 'nyc3', 'sfo3', 'sgp1', 'lon1', 'fra1', 'blr1'],
      },
    ]);
  }

  private async collectDeploymentConfig(provider: string) {
    const instanceChoices = {
      aws: ['t2.micro', 't2.small', 't2.medium', 't3.micro', 't3.small'],
      azure: ['Standard_B1s', 'Standard_B2s', 'Standard_D2s_v3'],
      gcp: ['e2-micro', 'e2-small', 'e2-medium', 'n1-standard-1'],
      digitalocean: ['s-1vcpu-1gb', 's-2vcpu-2gb', 's-2vcpu-4gb'],
    };

    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'instanceType',
        message: 'Select instance/tier type',
        choices: instanceChoices[provider],
      },
      {
        type: 'input',
        name: 'tier',
        message: 'Enter deployment tier (e.g., dev, staging, production):',
        default: 'production',
      },
      {
        type: 'confirm',
        name: 'autoScaling',
        message: 'Enable auto-scaling?',
        default: false,
      },
    ]);

    let minInstances = 1;
    let maxInstances = 1;

    if (answers.autoScaling) {
      const scalingConfig = await inquirer.prompt([
        {
          type: 'number',
          name: 'minInstances',
          message: 'Enter minimum instances:',
          default: 1,
          validate: (input) =>
            (input !== undefined && input > 0) || 'Must be greater than 0',
        },
        {
          type: 'number',
          name: 'maxInstances',
          message: 'Enter maximum instances:',
          default: 3,
          validate: (input) =>
            (input !== undefined && input > 0) || 'Must be greater than 0',
        },
      ]);
      minInstances = scalingConfig.minInstances;
      maxInstances = scalingConfig.maxInstances;
    }

    const healthConfig = await inquirer.prompt([
      {
        type: 'input',
        name: 'healthCheckPath',
        message: 'Enter health check endpoint path:',
        default: '/health',
      },
      {
        type: 'number',
        name: 'port',
        message: 'Enter application port:',
        default: 3000,
        validate: (input) =>
          (input !== undefined && this.validationService.validatePort(input)) ||
          'Invalid port number',
      },
    ]);

    return {
      instanceType: answers.instanceType,
      config: {
        tier: answers.tier,
        autoScaling: answers.autoScaling,
        minInstances,
        maxInstances,
        healthCheckPath: healthConfig.healthCheckPath,
        port: healthConfig.port,
      },
    };
  }

  private async collectNotificationConfig(): Promise<NotificationConfig> {
    const emailAnswer = await inquirer.prompt([
      {
        type: 'input',
        name: 'email',
        message: 'Enter email for notifications:',
        validate: (input) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(input) || 'Invalid email format';
        },
      },
    ]);

    const platformAnswer = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'platforms',
        message: 'Select additional notification platforms',
        choices: ['slack', 'discord', 'teams', 'telegram'],
      },
    ]);

    const platforms: NotificationPlatform[] = [];
    const webhookUrls: Record<string, string> = {};

    for (const platform of platformAnswer.platforms) {
      const webhook = await inquirer.prompt([
        {
          type: 'input',
          name: 'webhook',
          message: `Enter ${platform} webhook URL:`,
          validate: (input) =>
            input.startsWith('http') || 'Invalid webhook URL',
        },
      ]);

      platforms.push({
        type: platform as NotificationPlatform['type'],
        webhook: webhook.webhook,
      });
      webhookUrls[platform] = webhook.webhook;
    }

    return {
      email: emailAnswer.email,
      platforms,
      webhookUrls,
    };
  }

  private async collectJenkinsConfig() {
    return await inquirer.prompt([
      {
        type: 'input',
        name: 'agentLabel',
        message: 'Enter Jenkins agent label:',
        default: 'docker',
      },
      {
        type: 'number',
        name: 'timeout',
        message: 'Enter pipeline timeout (in minutes)',
        default: 60,
      },
      {
        type: 'number',
        name: 'retryCount',
        message: 'Enter retry count for failed stages:',
        default: 2,
      },
    ]);
  }
}

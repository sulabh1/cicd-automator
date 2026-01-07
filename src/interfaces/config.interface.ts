export interface ProjectConfig {
  projectName: string;
  projectType: 'frontend' | 'backend' | 'fullstack';
  language: 'javascript' | 'typescript';
  repository: string;
  branch: string;
  hasDockerfile: boolean;
  dockerfilePath?: string;
  runTests: boolean;
  testCommand?: string;
  buildCommand?: string;
}

export interface CloudConfig {
  provider: 'aws' | 'azure' | 'gcp' | 'digitalocean';
  credentials:
    | AWSCredentials
    | AzureCredentials
    | GCPCredentials
    | DOCredentials;
  region: string;
  instanceType: string;
  deploymentConfig: DeploymentConfig;
}

export interface AWSCredentials {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
}

export interface AzureCredentials {
  subscriptionId: string;
  clientId: string;
  clientSecret: string;
  tenantId: string;
}

export interface GCPCredentials {
  projectId: string;
  keyFile: string;
  region: string;
}

export interface DOCredentials {
  apiToken: string;
  region: string;
}

export interface DeploymentConfig {
  tier: string;
  autoScaling: boolean;
  minInstances?: number;
  maxInstances?: number;
  healthCheckPath: string;
  port: number;
}

export interface NotificationConfig {
  email: string;
  platforms: NotificationPlatform[];
  webhookUrls?: { [key: string]: string };
}

export interface NotificationPlatform {
  type: 'slack' | 'discord' | 'teams' | 'telegram';
  webhook?: string;
  apiKey?: string;
}

export interface CICDConfig {
  project: ProjectConfig;
  cloud: CloudConfig;
  notifications: NotificationConfig;
  jenkinsConfig: JenkinsConfig;
}

export interface JenkinsConfig {
  agentLabel: string;
  timeout: number;
  retryCount: number;
}

import { Injectable } from '@nestjs/common';
import { CloudConfig } from '../interfaces/config.interface';

@Injectable()
export class CloudProviderService {
  generateAWSDeploymentScript(
    config: CloudConfig,
    dockerImageName: string,
  ): string {
    const { region, deploymentConfig } = config;
    return `
    #AWS Deployment Configuration
    aws configure set aws_access_key_id \${AWS_ACCESS_KEY_ID}
    aws configure set aws_secret_access_key \${AWS_SECRET_ACCESS_KEY}
    aws configure set region ${region}

    #Create/Updateb ECS Cluster
    aws ecs create-cluster --cluster-name ${dockerImageName}-cluster || true

    #Register Task Definition
    cat >task-definition.json << EOF
    {
        "family": "${dockerImageName}",
        "networkMode": "awsvpc",
        "requiresCompatibility": ["FARGATE"],
        "cpu": "256",
        "memory": "512",
        "containerDefinitions": [
        {
            "name": "${dockerImageName}",
            "image": "${dockerImageName}",
            "portMappings": [
                {
                    "containerPort": ${deploymentConfig.port},
                    "protocol": "tcp"
                }
            ],
            "logConfiguration": {
                "logDriver": "awslogs",
                "options": {
                    "awslogs-group": "/ecs/${dockerImageName}",
                    "awslogs-region": "${region}",
                    "awslogs-stream-prefix": "ecs"
                }
            }
        },
        "healthCheck": {
            "command": ["CMD-SHELL", "curl -f http://localhost:${
              deploymentConfig.port
            }${deploymentConfig.healthCheckPath} || exit 1"],
            "interval": 30,
            "timeout": 5,
            "retries": 3
        }
        }]
    }
    EOF

    aws ecs register-task-definition --cli-input-json file://task-definition.json

    #Create or Update Service

    if[ "\$SERVICE_EXISTS" != "ACTIVE" ]; then
        aws ecs create-service \\
            --cluster ${dockerImageName}-cluster \\
            --service-name ${dockerImageName}-service \\
            --task-definition ${dockerImageName} \\
            --desired-count ${deploymentConfig.minInstances || 1} \\
            --launch-type FARGATE \\
            --network-configuration "awsvpcConfiguration={subnets=[\${SUBNET_IDS}], securityGroups=[\${SECURITY_GROUP_IDS}], assignPublicIp=ENABLED}"
    else
        aws ecs update-service \\
            --cluster ${dockerImageName}-cluster \\
            --service ${dockerImageName}-service \\
            --task-definition ${dockerImageName} \\
            --force-new-deployment
    fi

    echo "AWS deployment completed successfully"
    
    `;
  }

  generateAzureDeploymentScript(
    config: CloudConfig,
    dockerImageName: string,
  ): string {
    const { deploymentConfig } = config;

    return `
    # Azure Deployment Configuration
    az login --service-principal \\
        -u \${AZURE_CLIENT_ID} \\
        -p \${AZURE_CLIENT_SECRET} \\
        --tenant \${AZURE_TENANT_ID}
    
    az account set --subscription \${AZURE_SUBSCRIPTION_ID}

    # Create Resource Group
    az group create --name \${RESOURCE_GROUP_NAME} --location \${REGION}
    
    # Create Container Instance
    az container create \\
        --resource-group \${RESOURCE_GROUP} \\
        --name ${dockerImageName} \\
        --image \${DOCKER_IMAGE} \\
        --cpu 1 \\
        --memory 1.5 \\
        --registry-login-server \${ACR_LOGIN_SERVER} \\
        --registry-username \${ACR_USERNAME} \\
        --registry-password \${ACR_PASSWORD} \\
        --dns-name-label ${dockerImageName} \\
        --ports ${deploymentConfig.port}
        --environment-variables NODE_ENV=production \\
        --restart-policy Always
    
    echo "Azure deployment completed successfully"
    `;
  }

  generateGCPDeploymentScript(
    config: CloudConfig,
    dockerImageName: string,
  ): string {
    const { region, deploymentConfig } = config;

    return `
    # GCP Deployment Configuration
    gcloud auth activate-service-account --key-file=\${GCP_KEY_FILE}
    gcloud config set project \${GCP_PROJECT_ID}
    gcloud config set compute/region ${region}

    # Deploy to Cloud Run
    gcloud run deploy ${dockerImageName} \\
        --image \${DOCKER_IMAGE} \\
        --platform managed \\
        --region ${region} \\
        --allow-unauthenticated
        --port ${deploymentConfig.port} \\
        --memory 512Mi \\
        --cpu 1 \\
        --min-instances ${deploymentConfig.minInstances || 0} \\
        --max-instances ${deploymentConfig.maxInstances || 1} \\
        --set-env-vars NODE_ENV=production
    
    echo "GCP deployment completed successfully"
    `;
  }

  generateDigitalOceanDeploymentScript(
    config: CloudConfig,
    dockerImageName: string,
  ): string {
    const { region, deploymentConfig } = config;

    return `
    # DigitalOcean Deployment Configuration
    doctl auth init --access-token \${DO_API_TOKEN}

    #Create App Platform APP
    cat > app-spec.yaml << EOF
    name: ${dockerImageName}
    region: ${region}
    services:
        - name: ${dockerImageName}
          image: 
            registry-type: DOCKER_HUB
            repository: \${DOCKER_IMAGE}
          http_port: ${deploymentConfig.port}
          instance_count: ${deploymentConfig.minInstances || 1}
          instance_size_slug: basic-xxs
          health-check:
            http_path: ${deploymentConfig.healthCheckPath}
          routes:
            - path: /

    EOF

    # Create or update app

    APP_ID=\$(doctl apps list --format ID --no-header | head -n 1)

    if [ -z "\$APP_ID" ]; then
        doctl apps create --spec app-spec.yaml
    else
        doctl apps update \$APP_ID --spec app-spec.yaml
    fi

    echo "DigitalOcean deployment completed successfully
    `;
  }

  generateDeploymentScript(
    config: CloudConfig,
    dockerImageName: string,
  ): string {
    switch (config.provider) {
      case 'aws':
        return this.generateAWSDeploymentScript(config, dockerImageName);
      case 'azure':
        return this.generateAzureDeploymentScript(config, dockerImageName);
      case 'gcp':
        return this.generateGCPDeploymentScript(config, dockerImageName);
      case 'digitalocean':
        return this.generateDigitalOceanDeploymentScript(
          config,
          dockerImageName,
        );
      default:
        throw new Error(`Unsupported cloud provider: ${config.provider}`);
    }
  }

  generateCredentialsEnvironmentVariables(config: CloudConfig): string {
    const { provider, credentials } = config;

    switch (provider) {
      case 'aws':
        return `
            environment {
                AWS_ACCESS_KEY_ID = credentials('aws-access-key-id')
                AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
                AWS_REGION = '${credentials['aws-region']}'
            }`;
      case 'azure':
        return `
            environment {
                AZURE_CLIENT_ID = credentials('azure-client-id')
                AZURE_CLIENT_SECRET = credentials('azure-client-secret')
                AZURE_TENANT_ID = credentials('azure-tenant-id')
                AZURE_SUBSCRIPTION_ID = credentials('azure-subscription-id')
            }`;
      case 'gcp':
        return `
            environment {
                GCP_PROJECT_ID = credentials('gcp-project-id')
                GCP_KEY_FILE = credentials('gcp-key-file')
            }`;
      case 'digitalocean':
        return `
            environment {
                DO_API_TOKEN = credentials('do-api-token')
            }`;
      default:
        return '';
    }
  }
}

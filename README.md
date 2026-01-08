# Jenkins Generator 🚀

> **Automated Jenkins CI/CD pipeline generator for multi-cloud deployments with external services support**

[![npm version](https://badge.fury.io/js/jenkins-generator.svg)](https://badge.fury.io/js/jenkins-generator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)](https://nodejs.org/)

Never worry about CI/CD configuration again! This tool automatically generates production-ready Jenkins pipelines for AWS, Azure, GCP, and DigitalOcean with just a few questions. **Now with automatic external services configuration!**

## ✨ Features

### 🌍 Multi-Cloud Support

- **AWS** - ECS Fargate deployments with auto-scaling
- **Azure** - Container Instances with resource groups
- **GCP** - Cloud Run serverless containers
- **DigitalOcean** - App Platform deployments

### 🆕 External Services Configuration (v2.0.0)

- **🗄️ Databases** - PostgreSQL, MongoDB, MySQL, Redis, and more
- **⚡ Caching** - Redis, Memcached, ElastiCache
- **📨 Message Queues** - RabbitMQ, Kafka, SQS, Azure Service Bus
- **📦 Storage** - AWS S3, Azure Blob, Google Cloud Storage, MinIO
- **📧 Email Services** - SMTP, SendGrid, AWS SES, Mailgun
- **📊 Monitoring** - DataDog, Sentry, New Relic, Prometheus
- **🔧 Custom Services** - Any service your app needs
- **Automatic environment variable configuration**
- **Jenkins credentials management**
- **.env.template generation** for local development

### 🔒 Security First

- **AES-256 encryption** for credential storage
- **Masked sensitive data** in logs and output
- **Secure Jenkins credential references**
- **No hardcoded secrets** in generated files
- **Credential rotation reminders**
- **Automatic .gitignore updates** to protect .env files

### 📧 Multi-Channel Notifications

- **Email** - HTML formatted with build details
- **Slack** - Rich attachments with color coding
- **Discord** - Embedded messages with status
- **Microsoft Teams** - Adaptive cards
- **Telegram** - Markdown formatted messages

### 🐳 Docker-Based Deployments

- **Automated image building** from your Dockerfile
- **Registry push** to Docker Hub or private registry
- **Container orchestration** on cloud platforms
- **Health check verification**
- **Automatic cleanup** of old images
- **Environment variables injection** into containers

### 🧪 Testing Integration

- **Optional test execution** before deployment
- **Configurable test commands**
- **Test result publishing** in Jenkins
- **Retry logic** for flaky tests

### 📊 Advanced Features

- **Auto-scaling configuration**
- **Health check endpoints**
- **Deployment tier management** (dev/staging/production)
- **Build retry logic**
- **Comprehensive logging**
- **Post-deployment verification**

## 🎯 Why Use This?

**Before:**

```
❌ Manually write Jenkinsfile (hours of work)
❌ Configure cloud deployment scripts
❌ Set up notifications for each platform
❌ Handle credentials securely
❌ Configure database connections manually
❌ Manage environment variables
❌ Document the entire process
❌ Maintain and update pipelines
```

**After:**

```
✅ Run one command: jenkins-generator
✅ Answer a few questions
✅ Configure databases, caching, queues automatically
✅ Get production-ready pipeline
✅ Automatic .env.template generation
✅ Complete documentation included
✅ Security best practices built-in
✅ Multi-cloud support out of the box
```

## 📦 Installation

### Global Installation (Recommended)

```bash
npm install -g jenkins-generator
```

### Local Installation

```bash
npm install --save-dev jenkins-generator
```

### Requirements

- **Node.js** 16.0.0 or higher
- **npm** 7.0.0 or higher
- **Git** repository
- **Dockerfile** in your project (or we'll guide you)
- **Jenkins** 2.0+ with required plugins

## 🚀 Quick Start

### 1. Navigate to Your Project

```bash
cd your-awesome-project
```

### 2. Run the Generator

```bash
jenkins-generator
```

### 3. Answer Questions

The CLI will ask you about:

- Project details (name, type, language)
- Git repository and branch
- Docker configuration
- Testing preferences
- **External services** (databases, caching, storage, etc.) 🆕
- Cloud provider selection
- Deployment settings
- Notification channels
- Jenkins configuration

### 4. Review Generated Files

```
your-project/
├── Jenkinsfile                    # 🎯 Main pipeline with env vars
├── .env.template                  # 🆕 Template for local development
├── .gitignore                     # 🆕 Updated to exclude .env
└── .cicd/
    ├── README.md                  # 📖 Project documentation
    ├── CREDENTIALS_SETUP.md       # 🔐 Credential guide (with services)
    ├── config.encrypted.json      # 🔒 Encrypted backup
    └── .gitignore                 # 🚫 Protect secrets
```

### 5. Configure Services (New in v2.0.0!)

Copy `.env.template` to `.env` and fill in your values:

```bash
cp .env.template .env
nano .env  # or use your favorite editor
```

### 6. Configure Jenkins

Follow the instructions in `.cicd/CREDENTIALS_SETUP.md` to:

- Add credentials to Jenkins
- Configure external service credentials 🆕
- Create pipeline job
- Connect to your repository

### 7. Deploy!

Push your code and watch Jenkins automatically:

- ✅ Checkout code
- ✅ Install dependencies
- ✅ **Load environment variables** 🆕
- ✅ Run tests
- ✅ Build application
- ✅ Create Docker image
- ✅ Push to registry
- ✅ Deploy to cloud
- ✅ Verify health
- ✅ Send notifications

## 📚 Usage Examples

### Example 1: Node.js API with PostgreSQL on AWS

```bash
$ jenkins-generator

🚀 Jenkins Generator

? Enter your project name: my-api
? Select project type: backend
? Select programming language: typescript
? Enter Git repository URL: https://github.com/user/my-api.git
? Does your application use external services? Yes

📦 Let's configure your external services...

? Select service type: Database
? Select database type: postgresql
? Database host environment variable name: DB_HOST
? Database password environment variable name: DB_PASSWORD

? Add another service? No

? Select cloud provider: aws
? Select AWS region: us-east-1
? Enable auto-scaling? Yes

✅ Jenkins pipeline generated successfully!
```

**Generated .env.template:**

```env
# postgres-main (postgresql)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=myapp
DB_USERNAME=your_db_username_here
DB_PASSWORD=your_db_password_here
DATABASE_URL=your_database_url_here
```

### Example 2: React App with S3 Storage on GCP

```bash
$ jenkins-generator

? Enter your project name: my-react-app
? Select project type: frontend
? Does your application use external services? Yes

? Select service type: Storage
? Select storage service: s3
? Bucket name environment variable: S3_BUCKET
? Access key environment variable: S3_ACCESS_KEY

✅ Jenkins pipeline generated successfully!
```

## 🗄️ Supported External Services (v2.0.0)

### Databases

- PostgreSQL
- MongoDB
- MySQL / MariaDB
- Redis
- DynamoDB
- CosmosDB

### Caching

- Redis
- Memcached
- ElastiCache

### Message Queues

- RabbitMQ
- Apache Kafka
- AWS SQS
- Azure Service Bus

### Storage

- AWS S3
- Azure Blob Storage
- Google Cloud Storage
- MinIO
- DigitalOcean Spaces

### Email Services

- SMTP
- SendGrid
- AWS SES
- Mailgun
- Postmark

### Monitoring

- DataDog
- New Relic
- Sentry
- Prometheus
- Grafana

### Custom Services

- Any service with custom environment variables

## 🏗️ What Gets Generated

### Jenkinsfile

Complete Jenkins pipeline with:

- Git checkout
- Dependency installation
- **External services environment variables** 🆕
- Test execution (optional)
- Application build
- Docker image creation
- Registry push
- Cloud deployment
- Health checks
- Notifications

**Example Jenkinsfile Environment Block:**

```groovy
environment {
  // Cloud credentials
  AWS_ACCESS_KEY_ID = credentials('aws-access-key-id')

  // Database credentials (auto-generated)
  DB_HOST = '${env.DB_HOST ?: ""}'
  DB_USERNAME = credentials('db-username')
  DB_PASSWORD = credentials('db-password')

  // Redis credentials
  REDIS_HOST = '${env.REDIS_HOST ?: ""}'
  REDIS_PASSWORD = credentials('redis-password')

  // S3 credentials
  S3_BUCKET = '${env.S3_BUCKET ?: ""}'
  S3_ACCESS_KEY = credentials('s3-access-key')
}
```

### Documentation

- **README.md** - Project-specific pipeline documentation
- **CREDENTIALS_SETUP.md** - Step-by-step Jenkins credential setup (includes external services) 🆕
- **config.encrypted.json** - Encrypted configuration backup
- **.env.template** - Template for local development 🆕
- **EXTERNAL_SERVICES_GUIDE.md** - Complete guide for services configuration 🆕

## 🔧 Supported Cloud Providers

| Provider         | Service             | Features                                      |
| ---------------- | ------------------- | --------------------------------------------- |
| **AWS**          | ECS Fargate         | Auto-scaling, Health checks, CloudWatch logs  |
| **Azure**        | Container Instances | Resource groups, Managed identities           |
| **GCP**          | Cloud Run           | Serverless, Auto-scaling, Built-in monitoring |
| **DigitalOcean** | App Platform        | Simple deployment, Automatic SSL              |

## 🔐 Security Features

- **AES-256 Encryption** for credential storage
- **Masked credentials** in all output and logs
- **Jenkins credential storage** integration
- **No plain-text secrets** in generated files
- **Security best practices** documentation
- **Credential rotation** reminders
- **Automatic .gitignore** protection for .env files 🆕
- **Secret vs non-secret detection** for environment variables 🆕

## 📖 Documentation

- [Setup Guide](./SETUP_GUIDE.md) - Complete installation and setup
- [External Services Guide](./EXTERNAL_SERVICES_GUIDE.md) - Configuration for databases, caching, etc. 🆕
- [Deployment Checklist](./DEPLOYMENT_CHECKLIST.md) - Pre/post deployment steps
- [Troubleshooting](#troubleshooting) - Common issues and solutions

## 🛠️ Requirements

### Jenkins Plugins

Required plugins (automatically documented in generated files):

- Docker Pipeline
- Git Plugin
- Email Extension Plugin
- Pipeline Plugin
- Credentials Binding Plugin
- Blue Ocean (optional)

### Cloud Provider Credentials

You'll need credentials for your chosen cloud provider:

**AWS:**

- Access Key ID
- Secret Access Key

**Azure:**

- Subscription ID
- Client ID
- Client Secret
- Tenant ID

**GCP:**

- Project ID
- Service Account Key File

**DigitalOcean:**

- API Token

## 🐛 Troubleshooting

### Issue: "Command not found"

```bash
# Reinstall globally
npm install -g jenkins-generator

# Or check npm global bin path
npm config get prefix
```

### Issue: "Dockerfile not found"

- Ensure Dockerfile exists at specified path
- Check path is relative to project root
- Verify file name is exactly `Dockerfile` (case-sensitive)

### Issue: "Cannot connect to database"

- Verify database credentials in Jenkins
- Check network connectivity from Jenkins to database
- Ensure firewall rules allow connection
- Verify environment variables are loaded correctly

### Issue: "Deployment failed"

- Verify cloud provider credentials in Jenkins
- Check instance type availability in selected region
- Review deployment logs in cloud console
- Ensure sufficient permissions/quotas

### More Help

For more troubleshooting, check the generated `.cicd/README.md` in your project.

## 🆕 What's New in v2.0.0

### Major Features

- ✅ **External Services Configuration** - Automatically configure databases, caching, queues, storage, and more
- ✅ **Environment Variables Management** - Automatic generation and injection
- ✅ **.env.template Generation** - For local development
- ✅ **20+ Services Supported** - PostgreSQL, MongoDB, Redis, S3, SMTP, Kafka, and more
- ✅ **Automatic Jenkins Credentials** - Generates complete credential setup guide
- ✅ **Security Enhancements** - Automatic secret detection and .gitignore updates
- ✅ **Complete Documentation** - New EXTERNAL_SERVICES_GUIDE.md

### Breaking Changes

None! v2.0.0 is fully backward compatible with v1.0.0. If you don't configure external services, it works exactly like v1.0.0.

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- Built with [NestJS](https://nestjs.com/)
- Powered by [TypeScript](https://www.typescriptlang.org/)
- CLI powered by [Inquirer](https://github.com/SBoudrias/Inquirer.js)
- Styled with [Chalk](https://github.com/chalk/chalk)

## 📞 Support

- 📧 **Email:** sulabhadhikari90@gmail.com
- 🐛 **Issues:** [GitHub Issues](https://github.com/sulabh1/cicd-automator/issues)
- 📚 **Docs:** Full documentation in generated `.cicd/` folder

## ⭐ Show Your Support

If this tool helped you, please:

- ⭐ Star the repository
- 🐦 Tweet about it
- 📝 Write a blog post
- 💬 Tell your friends
- You can also [buy me a coffee](For this please mail me at sulabhadhikari90@gmail.com)

---

**Made with ❤️ by developers, for developers**

_Stop configuring CI/CD manually. Start deploying automatically!_

```bash
npm install -g jenkins-generator
cd your-project
jenkins-generator
# Configure your services, deploy! 🎉
```

# Auto CICD Generator 🚀

> **Automated Jenkins CI/CD pipeline generator for multi-cloud deployments**

[![npm version](https://badge.fury.io/js/%40yourorg%2Fauto-cicd-generator.svg)](https://badge.fury.io/js/%40yourorg%2Fauto-cicd-generator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)](https://nodejs.org/)

Never worry about CI/CD configuration again! This tool automatically generates production-ready Jenkins pipelines for AWS, Azure, GCP, and DigitalOcean with just a few questions.

## ✨ Features

### 🌍 Multi-Cloud Support

- **AWS** - ECS Fargate deployments with auto-scaling
- **Azure** - Container Instances with resource groups
- **GCP** - Cloud Run serverless containers
- **DigitalOcean** - App Platform deployments

### 🔒 Security First

- **AES-256 encryption** for credential storage
- **Masked sensitive data** in logs and output
- **Secure Jenkins credential references**
- **No hardcoded secrets** in generated files
- **Credential rotation reminders**

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
❌ Document the entire process
❌ Maintain and update pipelines
```

**After:**

```
✅ Run one command: auto-cicd
✅ Answer a few questions
✅ Get production-ready pipeline
✅ Complete documentation included
✅ Security best practices built-in
✅ Multi-cloud support out of the box
```

## 📦 Installation

### Global Installation (Recommended)

```bash
npm install -g @yourorg/auto-cicd-generator
```

### Local Installation

```bash
npm install --save-dev @yourorg/auto-cicd-generator
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
auto-cicd
```

### 3. Answer Questions

The CLI will ask you about:

- Project details (name, type, language)
- Git repository and branch
- Docker configuration
- Testing preferences
- Cloud provider selection
- Deployment settings
- Notification channels
- Jenkins configuration

### 4. Review Generated Files

```
your-project/
├── Jenkinsfile                    # 🎯 Main pipeline
└── .cicd/
    ├── README.md                  # 📖 Project documentation
    ├── CREDENTIALS_SETUP.md       # 🔐 Credential guide
    ├── config.encrypted.json      # 🔒 Encrypted backup
    └── .gitignore                 # 🚫 Protect secrets
```

### 5. Configure Jenkins

Follow the instructions in `.cicd/CREDENTIALS_SETUP.md` to:

- Add credentials to Jenkins
- Create pipeline job
- Connect to your repository

### 6. Deploy!

Push your code and watch Jenkins automatically:

- ✅ Checkout code
- ✅ Install dependencies
- ✅ Run tests
- ✅ Build application
- ✅ Create Docker image
- ✅ Push to registry
- ✅ Deploy to cloud
- ✅ Verify health
- ✅ Send notifications

## 📚 Detailed Usage

### Example 1: Node.js API on AWS

```bash
$ auto-cicd

🚀 Auto CICD Generator

? Enter your project name: my-api
? Select project type: backend
? Select programming language: typescript
? Enter Git repository URL: https://github.com/user/my-api.git
? Enter branch name to deploy: master
? Does your project have a Dockerfile? Yes
? Enter Dockerfile path: ./Dockerfile
? Should tests run before deployment? Yes
? Enter test command: npm test
? Enter build command: npm run build
? Select cloud provider: aws
? Enter AWS Access Key ID: AKIA************
? Enter AWS Secret Access Key: ********
? Select AWS region: us-east-1
? Select instance/tier type: t2.small
? Enter deployment tier: production
? Enable auto-scaling? Yes
? Enter minimum instances: 2
? Enter maximum instances: 10
? Enter health check endpoint path: /api/health
? Enter application port: 3000
? Enter email for notifications: devops@company.com
? Select additional notification platforms: slack, discord
? Enter slack webhook URL: https://hooks.slack.com/services/...
? Enter discord webhook URL: https://discord.com/api/webhooks/...
? Enter Jenkins agent label: docker
? Enter pipeline timeout (in minutes): 60
? Enter retry count for failed stages: 2

✅ CICD Pipeline generated successfully!
```

### Example 2: React App on GCP

```bash
$ auto-cicd

🚀 Auto CICD Generator

? Enter your project name: my-react-app
? Select project type: frontend
? Select programming language: javascript
? Enter Git repository URL: https://github.com/user/my-react-app.git
? Enter branch name to deploy: main
? Does your project have a Dockerfile? Yes
? Enter Dockerfile path: ./Dockerfile
? Should tests run before deployment? Yes
? Enter test command: npm test
? Enter build command: npm run build
? Select cloud provider: gcp
? Enter GCP Project ID: my-project-123456
? Enter path to GCP service account key file: ./gcp-key.json
? Select GCP region: us-central1
? Select instance/tier type: e2-small
? Enter deployment tier: production
? Enable auto-scaling? No
? Enter health check endpoint path: /
? Enter application port: 80
? Enter email for notifications: team@company.com
? Select additional notification platforms: teams
? Enter teams webhook URL: https://outlook.office.com/webhook/...
? Enter Jenkins agent label: docker
? Enter pipeline timeout (in minutes): 45
? Enter retry count for failed stages: 3

✅ CICD Pipeline generated successfully!
```

### Example 3: Full-Stack App on DigitalOcean

```bash
$ auto-cicd

🚀 Auto CICD Generator

? Enter your project name: my-fullstack-app
? Select project type: fullstack
? Select programming language: typescript
? Enter Git repository URL: https://gitlab.com/user/my-fullstack-app.git
? Enter branch name to deploy: master
? Does your project have a Dockerfile? Yes
? Enter Dockerfile path: ./Dockerfile
? Should tests run before deployment? Yes
? Enter test command: npm run test:all
? Enter build command: npm run build
? Select cloud provider: digitalocean
? Enter DigitalOcean API Token: ********************************
? Select DigitalOcean region: nyc3
? Select instance/tier type: s-2vcpu-4gb
? Enter deployment tier: staging
? Enable auto-scaling? No
? Enter health check endpoint path: /health
? Enter application port: 8080
? Enter email for notifications: staging@company.com
? Select additional notification platforms: telegram
? Enter telegram webhook URL: https://api.telegram.org/bot.../
? Enter Jenkins agent label: docker
? Enter pipeline timeout (in minutes): 90
? Enter retry count for failed stages: 2

✅ CICD Pipeline generated successfully!
```

## 🏗️ Architecture

### Project Structure

```
auto-cicd-generator/
├── src/
│   ├── cli.ts                          # CLI entry point
│   ├── index.ts                        # Package exports
│   ├── app.module.ts                   # NestJS module
│   ├── interfaces/
│   │   └── config.interface.ts         # TypeScript interfaces
│   └── services/
│       ├── cicd-generator.service.ts   # Main orchestrator
│       ├── prompt.service.ts           # User interaction
│       ├── jenkinsfile.service.ts      # Jenkinsfile generation
│       ├── cloud-provider.service.ts   # Cloud scripts
│       ├── notification.service.ts     # Notification code
│       ├── security.service.ts         # Encryption/security
│       └── validation.service.ts       # Input validation
├── package.json
├── tsconfig.json
├── README.md
├── SETUP_GUIDE.md
└── DEPLOYMENT_CHECKLIST.md
```

### Technology Stack

- **Framework**: NestJS (Dependency Injection, Modular Architecture)
- **Language**: TypeScript (Type Safety)
- **CLI**: Inquirer (Interactive Prompts)
- **Styling**: Chalk (Colored Output)
- **Spinner**: Ora (Loading Indicators)
- **Encryption**: crypto-js (AES-256)
- **File System**: fs-extra (Enhanced File Operations)

### Generated Pipeline Flow

```
┌─────────────────────────────────────────────────────────────┐
│  1. CHECKOUT                                                │
│     └─ Clone repository from Git                           │
├─────────────────────────────────────────────────────────────┤
│  2. INSTALL DEPENDENCIES                                    │
│     └─ npm ci (clean install)                              │
├─────────────────────────────────────────────────────────────┤
│  3. RUN TESTS (Optional)                                    │
│     └─ Execute test command with retry                     │
├─────────────────────────────────────────────────────────────┤
│  4. BUILD APPLICATION                                       │
│     └─ Run build command (npm run build)                   │
├─────────────────────────────────────────────────────────────┤
│  5. BUILD DOCKER IMAGE                                      │
│     └─ docker build from Dockerfile                        │
├─────────────────────────────────────────────────────────────┤
│  6. PUSH TO REGISTRY                                        │
│     └─ Push image to Docker Hub/private registry           │
├─────────────────────────────────────────────────────────────┤
│  7. DEPLOY TO CLOUD                                         │
│     ├─ AWS: ECS Fargate                                    │
│     ├─ Azure: Container Instances                          │
│     ├─ GCP: Cloud Run                                      │
│     └─ DigitalOcean: App Platform                          │
├─────────────────────────────────────────────────────────────┤
│  8. HEALTH CHECK                                            │
│     └─ Verify deployment with health endpoint              │
├─────────────────────────────────────────────────────────────┤
│  9. CLEANUP                                                 │
│     └─ Remove old Docker images                            │
├─────────────────────────────────────────────────────────────┤
│  10. NOTIFICATIONS                                          │
│      ├─ Email (HTML formatted)                             │
│      ├─ Slack (Rich attachments)                           │
│      ├─ Discord (Embeds)                                   │
│      ├─ Teams (Adaptive cards)                             │
│      └─ Telegram (Markdown)                                │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 Configuration Options

### Project Configuration

| Option         | Type    | Description                  | Example                            |
| -------------- | ------- | ---------------------------- | ---------------------------------- |
| projectName    | string  | Name of your project         | `my-awesome-app`                   |
| projectType    | enum    | frontend, backend, fullstack | `backend`                          |
| language       | enum    | javascript, typescript       | `typescript`                       |
| repository     | string  | Git repository URL           | `https://github.com/user/repo.git` |
| branch         | string  | Branch to deploy             | `master`                           |
| hasDockerfile  | boolean | Dockerfile exists            | `true`                             |
| dockerfilePath | string  | Path to Dockerfile           | `./Dockerfile`                     |
| runTests       | boolean | Run tests before deploy      | `true`                             |
| testCommand    | string  | Test command                 | `npm test`                         |
| buildCommand   | string  | Build command                | `npm run build`                    |

### Cloud Configuration

#### AWS Options

| Option          | Description       | Example     |
| --------------- | ----------------- | ----------- |
| accessKeyId     | AWS Access Key    | `AKIA...`   |
| secretAccessKey | AWS Secret Key    | `****`      |
| region          | AWS Region        | `us-east-1` |
| instanceType    | ECS instance type | `t2.small`  |

#### Azure Options

| Option         | Description         | Example  |
| -------------- | ------------------- | -------- |
| subscriptionId | Azure Subscription  | `uuid`   |
| clientId       | Azure Client ID     | `uuid`   |
| clientSecret   | Azure Client Secret | `****`   |
| tenantId       | Azure Tenant ID     | `uuid`   |
| region         | Azure Region        | `eastus` |

#### GCP Options

| Option    | Description         | Example          |
| --------- | ------------------- | ---------------- |
| projectId | GCP Project ID      | `my-project-123` |
| keyFile   | Service Account Key | `./gcp-key.json` |
| region    | GCP Region          | `us-central1`    |

#### DigitalOcean Options

| Option   | Description  | Example |
| -------- | ------------ | ------- |
| apiToken | DO API Token | `****`  |
| region   | DO Region    | `nyc3`  |

### Deployment Configuration

| Option          | Type    | Description            | Example      |
| --------------- | ------- | ---------------------- | ------------ |
| tier            | string  | Deployment environment | `production` |
| autoScaling     | boolean | Enable auto-scaling    | `true`       |
| minInstances    | number  | Minimum instances      | `2`          |
| maxInstances    | number  | Maximum instances      | `10`         |
| healthCheckPath | string  | Health check endpoint  | `/health`    |
| port            | number  | Application port       | `3000`       |

### Notification Configuration

| Platform | Format         | Features                    |
| -------- | -------------- | --------------------------- |
| Email    | HTML           | Build status, logs, changes |
| Slack    | Attachments    | Color coding, fields        |
| Discord  | Embeds         | Rich formatting, links      |
| Teams    | Adaptive Cards | Interactive buttons         |
| Telegram | Markdown       | Emojis, formatting          |

## 🔐 Security

### Credential Management

1. **Never commit credentials** to Git
2. **Use Jenkins credential storage** for all sensitive data
3. **Encrypted backups** with AES-256 encryption
4. **Masked output** in logs and terminal
5. **Least-privilege** IAM policies recommended

### Best Practices

```yaml
✅ DO:
  - Store credentials in Jenkins
  - Use environment variables
  - Rotate credentials regularly
  - Enable MFA on cloud accounts
  - Review IAM policies
  - Use HTTPS for Jenkins
  - Enable audit logging

❌ DON'T:
  - Commit .cicd/config.encrypted.json
  - Hardcode credentials in Jenkinsfile
  - Share credentials in plain text
  - Use root/admin accounts
  - Disable security features
  - Skip credential rotation
```

## 📖 Documentation

### Generated Documentation

After running `auto-cicd`, you'll get:

1. **Jenkinsfile** - Complete pipeline configuration
2. **.cicd/README.md** - Project-specific documentation
3. **.cicd/CREDENTIALS_SETUP.md** - Credential setup guide
4. **.cicd/config.encrypted.json** - Encrypted configuration backup

### Additional Resources

- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Complete setup instructions
- [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) - Deployment checklist
- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [Docker Documentation](https://docs.docker.com/)

## 🛠️ Development

### Setup Development Environment

```bash
# Clone the repository
git clone https://github.com/yourorg/auto-cicd-generator.git
cd auto-cicd-generator

# Install dependencies
npm install

# Build the project
npm run build

# Link for local testing
npm link

# Test in a project
cd /path/to/test-project
auto-cicd
```

### Project Scripts

```bash
npm run build        # Compile TypeScript to JavaScript
npm run start        # Run the CLI
npm run prepublishOnly  # Runs before npm publish
```

### Publishing

```bash
# Login to NPM
npm login

# Publish package
npm publish --access public
```

## 🤝 Contributing

We welcome contributions! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow TypeScript best practices
- Add tests for new features
- Update documentation
- Follow existing code style
- Write clear commit messages

## 🐛 Troubleshooting

### Common Issues

<details>
<summary><strong>Issue: "Dockerfile not found"</strong></summary>

**Solution:**

- Ensure Dockerfile exists at the specified path
- Path should be relative to project root
- Check file name is exactly `Dockerfile` (case-sensitive)
</details>

<details>
<summary><strong>Issue: "Failed to push Docker image"</strong></summary>

**Solution:**

- Verify Docker registry credentials in Jenkins
- Check network connectivity
- Ensure sufficient disk space
- Verify Docker daemon is running
</details>

<details>
<summary><strong>Issue: "Deployment failed"</strong></summary>

**Solution:**

- Verify cloud provider credentials
- Check instance type is available in selected region
- Review deployment logs in cloud console
- Ensure sufficient permissions/quotas
</details>

<details>
<summary><strong>Issue: "Health check failed"</strong></summary>

**Solution:**

- Verify health endpoint exists and returns 200 OK
- Check application actually started
- Increase health check timeout if needed
- Review application logs
</details>

<details>
<summary><strong>Issue: "Notifications not received"</strong></summary>

**Solution:**

- Verify email SMTP settings in Jenkins
- Check webhook URLs are accessible
- Test notification channels manually
- Review firewall rules
</details>

## 📊 Use Cases

### Startups & Small Teams

- Quick CI/CD setup without DevOps expertise
- Multi-cloud flexibility
- Cost-effective automated deployments

### Enterprise

- Standardized pipeline across teams
- Security best practices built-in
- Consistent deployment process

### Open Source Projects

- Easy contributor onboarding
- Automated releases
- Free tier cloud deployments

### Microservices

- Replicate pipeline for each service
- Consistent deployment patterns
- Individual service scaling

## 🎓 Examples

### Dockerfile Examples

<details>
<summary><strong>Node.js Backend</strong></summary>

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]
```

</details>

<details>
<summary><strong>React Frontend</strong></summary>

```dockerfile
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

</details>

<details>
<summary><strong>TypeScript API</strong></summary>

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm ci

COPY . .
RUN npm run build

RUN npm ci --only=production

EXPOSE 3000

CMD ["node", "dist/main.js"]
```

</details>

## 📈 Roadmap

### Version 1.x (Current)

- ✅ Multi-cloud support (AWS, Azure, GCP, DigitalOcean)
- ✅ Multi-channel notifications
- ✅ Docker-based deployments
- ✅ Security features

### Version 2.0 (Planned)

- [ ] Kubernetes support
- [ ] Helm chart generation
- [ ] Blue-green deployments
- [ ] Canary deployments
- [ ] A/B testing support

### Version 3.0 (Future)

- [ ] GitLab CI/CD support
- [ ] GitHub Actions support
- [ ] CircleCI support
- [ ] Advanced monitoring integration
- [ ] Cost optimization recommendations

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- Built with [NestJS](https://nestjs.com/)
- Powered by [TypeScript](https://www.typescriptlang.org/)
- CLI powered by [Inquirer](https://github.com/SBoudrias/Inquirer.js)
- Styled with [Chalk](https://github.com/chalk/chalk)

## 📞 Support

- 📧 Email: support@yourorg.com
- 💬 Discord: [Join our community](https://discord.gg/yourserver)
- 🐛 Issues: [GitHub Issues](https://github.com/yourorg/auto-cicd-generator/issues)
- 📚 Docs: [Full Documentation](https://docs.yourorg.com)

## ⭐ Show Your Support

If this tool helped you, please:

- ⭐ Star the repository
- 🐦 Tweet about it
- 📝 Write a blog post
- 💬 Tell your friends

---

**Made with ❤️ by developers, for developers**

_Stop configuring CI/CD manually. Start deploying automatically!_

```bash
npm install -g @yourorg/auto-cicd-generator
cd your-project
auto-cicd
# That's it! 🎉
```

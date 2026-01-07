import { Injectable } from '@nestjs/common';
import { PromptService } from './prompt.service';
import { JenkinsFileService } from './jenkinsfile.service';
import { SecurityService } from './security.service';
import { ValidationService } from './validation.service';
import * as fs from 'fs-extra';
import * as path from 'path';
import chalk from 'chalk';
import ora from 'ora';

@Injectable()
export class CICDGeneratorService {
  constructor(
    private readonly promptService: PromptService,
    private readonly jenkinsFileService: JenkinsFileService,
    private readonly securityService: SecurityService,
    private readonly validationService: ValidationService,
  ) {}

  async run(): Promise<void> {
    try {
      console.log(chalk.cyan('Starting CICD configuration...\n'));

      const spinner = ora('Validating project structure...').start();

      try {
        const packageJson = await this.validationService.readPackageJson();
        spinner.succeed('Project structure validated');
        console.log(chalk.gray(`Found projhect: ${packageJson.name}`));
      } catch (error) {
        spinner.fail('Project validation failed');
        throw error;
      }
      // Collect all configurations
      console.log(chalk.yellow('Please provide the following information:\n'));
      const config = await this.promptService.collectAllConfigurations();

      // Generate Jenkinsfile
      const generatingSpinner = ora('Generating Jenkinsfile...').start();
      const jenkinsfile = this.jenkinsFileService.generateJenkinsfile(config);
      generatingSpinner.succeed('Jenkinsfile generated');

      // Generate supporting files
      const credentialsGuide =
        this.jenkinsFileService.generateCredentialsSetupGuide(config);
      const readme = this.jenkinsFileService.generateReadme(config);

      // writes files
      const writingSpinner = ora('Writing files...').start();
      await this.writeFiles(jenkinsfile, credentialsGuide, readme, config);
      writingSpinner.succeed('Files written successfully');

      // Display summary
      this.displaySummary(config);
    } catch (error) {
      console.error(chalk.red('\n❌ Error:'), error);
    }
  }
  private async writeFiles(
    jenkinsfile: string,
    credentialsGuide: string,
    readme: string,
    config: any,
  ): Promise<void> {
    const rootDir = process.cwd();
    const cicdDir = path.join(rootDir, '.cicd');

    //Ensure .cicd directory exists
    await fs.ensureDir(cicdDir);

    // Write Jenkinsfile to root
    const jenkinsfilePath = path.join(rootDir, 'Jenkinsfile');
    await fs.writeFile(jenkinsfilePath, jenkinsfile);

    // Write credentials guide
    const credentialsPath = path.join(cicdDir, 'CREDENTIALS_SETUP.md');
    await fs.writeFile(credentialsPath, credentialsGuide);

    // Write README
    const readmePath = path.join(cicdDir, 'README.md');
    await fs.writeFile(readmePath, readme);

    // Write encrypted config for reference (optional)
    const configPath = path.join(cicdDir, 'config.encrypted.json');
    const encryptedConfig = this.securityService.encryptCredentials(config);
    await fs.writeFile(
      configPath,
      JSON.stringify({ encrypted: encryptedConfig }, null, 2),
    );

    // Create .gitignore for .cicd directory
    const gitignorePath = path.join(cicdDir, '.gitignore');
    await fs.writeFile(gitignorePath, 'config.encrypted.json\n*.log\n');

    console.log(chalk.green('\n📁 Generated files:'));
    console.log(chalk.gray(`  ├─ Jenkinsfile (${jenkinsfilePath})`));
    console.log(chalk.gray(`  ├─ .cicd/CREDENTIALS_SETUP.md`));
    console.log(chalk.gray(`  ├─ .cicd/README.md`));
    console.log(chalk.gray(`  └─ .cicd/config.encrypted.json`));
  }

  private displaySummary(config: any): void {
    console.log(
      chalk.green.bold('\n✅ CICD Pipeline Generated Successfully!\n'),
    );

    console.log(chalk.cyan('📋 Configuration Summary:'));
    console.log(chalk.gray('─'.repeat(60)));
    console.log(chalk.white(`  Project:       ${config.project.projectName}`));
    console.log(chalk.white(`  Type:          ${config.project.projectType}`));
    console.log(chalk.white(`  Language:      ${config.project.language}`));
    console.log(chalk.white(`  Repository:    ${config.project.repository}`));
    console.log(chalk.white(`  Branch:        ${config.project.branch}`));
    console.log(
      chalk.white(`  Cloud:         ${config.cloud.provider.toUpperCase()}`),
    );
    console.log(chalk.white(`  Region:        ${config.cloud.region}`));
    console.log(chalk.white(`  Instance:      ${config.cloud.instanceType}`));
    console.log(
      chalk.white(
        `  Tests:         ${config.project.runTests ? 'Enabled' : 'Disabled'}`,
      ),
    );
    console.log(
      chalk.white(
        `  Auto-scaling:  ${
          config.cloud.deploymentConfig.autoScaling ? 'Enabled' : 'Disabled'
        }`,
      ),
    );
    console.log(chalk.gray('─'.repeat(60)));

    console.log(chalk.yellow('\n📝 Next Steps:\n'));
    console.log(
      chalk.white('  1. Review the generated Jenkinsfile in your project root'),
    );
    console.log(
      chalk.white(
        '  2. Read .cicd/CREDENTIALS_SETUP.md for Jenkins credential setup',
      ),
    );
    console.log(chalk.white('  3. Configure Jenkins credentials as specified'));
    console.log(chalk.white('  4. Create a new Jenkins Pipeline job'));
    console.log(chalk.white('  5. Point Jenkins to your repository'));
    console.log(chalk.white('  6. Run the pipeline and monitor deployment'));

    console.log(chalk.yellow('\n⚠️  Important Security Notes:\n'));
    console.log(
      chalk.red(
        '  • NEVER commit .cicd/config.encrypted.json to version control',
      ),
    );
    console.log(
      chalk.red('  • Always use Jenkins credential storage for sensitive data'),
    );
    console.log(chalk.red('  • Review and rotate credentials regularly'));
    console.log(chalk.red('  • Keep your Jenkinsfile in version control'));

    console.log(
      chalk.cyan('\n🚀 Your CI/CD pipeline is ready for deployment!\n'),
    );
    console.log(
      chalk.gray(`For detailed documentation, check .cicd/README.md\n`),
    );
  }
}

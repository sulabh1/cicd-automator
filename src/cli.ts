#!/usr/bin/env node

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CICDGeneratorService } from './services/cicd-generator.service';
import chalk from 'chalk';
import ora from 'ora';

async function bootstrap() {
  console.log(chalk.blue.bold('\n🚀 Auto CICD Generator\n'));

  const spinner = ora('Initializing...').start();

  try {
    const app = await NestFactory.createApplicationContext(AppModule, {
      logger: false,
    });

    spinner.succeed('Initialized successfully');

    const cicdGenerator = app.get(CICDGeneratorService);

    await cicdGenerator.run();

    await app.close();

    console.log(
      chalk.green.bold('\n✅ CICD Pipeline generated successfully!\n'),
    );
  } catch (error) {
    spinner.fail('Failed to initialize');
    console.error(chalk.red('\n❌ Error:'), error.message);
    process.exit(1);
  }
}

bootstrap();

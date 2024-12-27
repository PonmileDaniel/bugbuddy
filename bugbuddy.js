#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs';
import axios from 'axios';
import chalk  from 'chalk';

const program = new Command();

program
  .name('bugbuddy')
  .description(chalk.bold.cyan('An AI-powered debugging companion for developers'))
  .version('1.0.0');

// Description for the program and file-based log checking
program.command('check')
  .description('Check stack traces or error log file for JS')
  .option('-f, --file <path>', 'Path to the log file')
  .action((options) => {
    const filePath = options.file;

    if (filePath) {
      // File-based log checking
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        console.log(`Checking ${filePath} for JS errors...`);
        analyzeLogs(content, filePath);
      } catch (err) {
        console.error(chalk.redBright.bold(`\n⛔ Error reading file: ${err.message}`));
      }
    } else {
      // Terminal input handling
      console.log(`No file provided. Paste your error logs below and press ${chalk.magenta('Ctrl+D')} when done:`);
      let input = '';
      process.stdin.on('data', (chunk) => {
        input += chunk;
      });
      process.stdin.on('end', async () => {
        await analyzeLogs(input.trim(), 'Terminal Input');
      });
    }
  });

// Log analysis function
async function analyzeLogs(content, source) {
  if (!content) {
    console.error(`No content provided from ${source}.`);
    return;
  }

  console.log(chalk.blue(`\n📤 Sending logs from ${source} to the backend for analysis...`));

  try {
    const response = await axios.post('http://localhost:5000/analyse', { logs: content });

    const { summary, codeFix } = response.data;
    console.log(chalk.bold.yellow('\n📝Log Analysis Results:'));
    console.log(chalk.green.bold('\n✔️Summary:'), chalk.cyan(summary,'\n'));
    console.log(chalk.green.bold('✔️Code Fix Suggestion:'), codeFix);

  } catch(err) {
    console.error('Error connecting to the server:', err.message)
    console.log('Try again one more time')
    
  }
}

program.parse();

#!/usr/bin/env node --loader ts-node/esm


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
  .option('--fix', 'Automatically write into file to be fixed')
  .action(async(options) => {
    // const fix = options;
    const{ fix, file: filePath} = options;

    if (filePath) {
      // File-based log checking
      try {
        //Read
        const content = fs.readFileSync(filePath, 'utf-8');
        console.log(`Checking ${filePath} for JS errors...`);
        await analyzeLogs(content, filePath, fix);
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
        await analyzeLogs(input.trim(), 'Terminal Input', fix);
      });
    }
  });

// Log analysis function
async function analyzeLogs(content, source, fix) {
  if (!content) {
    console.error(`No content provided from ${source}.`);
    return;
  }

  console.log(chalk.blue(`\n📤 Sending logs from ${source} to the backend for analysis...`));

  try {
    const response = await axios.post('http://localhost:5000/analyse', { logs: content,
      // Fix code
      fix: fix,
     });

    const { summary, codeFix } = response.data;
    console.log(chalk.bold.yellow('\n📝Log Analysis Results:'));
    
    console.log(chalk.green.bold('\n✔️Summary:'), chalk.cyan(summary,'\n'));
    console.log(chalk.green.bold('✔️Code Fix Suggestion:'), codeFix);

    //Create a backup file
    if (fix && codeFix) {
      // Create backup file 
      const backupFile = `${source}.bak`;
      fs.writeFileSync(backupFile, content);
      console.log(chalk.green(`\n📂 Backup created: ${backupFile}`))

      //Write the fixed content to the original fine
      fs.writeFileSync(source, codeFix);
      console.log(chalk.green(`\n🔧 Issues fixed and saved to ${source}`));
    } else {
      console.log(chalk.blue('\nNo fixes suggested or needed.'));
    }

  } catch(err) {
    console.error('Error connecting to the server:', err.message)
    console.log('Try again one more time')
    
  }
}

program.parse(process.argv);
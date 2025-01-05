# BugBuddy CLI 🐞

Welcome aboard BugBuddy Express Flight A11 to the world!
While we wait for takeoff, please take a moment to review the docs. Sleeping is prohibited for the duration of the flight, but if you’ve got some good coffee, feel free to pass it around. Let's debug with style and land safely on the shores of clean code!

## Features
- Error Log Analysis:
    Parse error logs and provide insights on the root cause of issues.
    Suggest potential fixes for common errors.

- Auto Backup
    Automatically creates backups of error logs and processed files to ensure debugging sessions are safe.

- Intelligent Fix Suggestions
    Leverages AI to suggest fixes for code issues.

- Seamless Integration
    Works with vanila js, node.js and react.

- Easy to Use
    Simple CLI commands make debugging accessible and efficient.

## Installation
To install BugBuddy, ensure you have Node.js installed, then run:

```bash
  npm install -g bugbuddy
```

## Usage
BugBuddy offers simple commands for all your debugging needs:

## 1. Analyze an Error Message Directly
Use the bugbuddy check command to input an error message directly into the terminal.

```bash
  bugbuddy check
```
You will be prompted to enter your error message.
BugBuddy will then analyze the error and provide debugging insights, such as the likely cause and suggestions for fixes.


bugbuddy check -f app.js --fix
bugbuddy check 
bugbuddy check -f app.js
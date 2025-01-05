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

Example
```bash
  bugbuddy check
```
You will be prompted to enter your error message.
BugBuddy will then analyze the error and provide debugging insights, such as the likely cause and suggestions for fixes.

## 2. Analyze a JavaScript File
Use the bugbuddy check -f <file> command to scan a JavaScript file for errors.

Example
```bash
  bugbuddy check -f <path-to-file>
```
BugBuddy will:
- Parse the <path-to-file> eg app.js file.
- Identify and analyze errors in your code.
- Provide AI-powered suggestions for fixing the errors.

## 3. Analyze and fix Automatically
Use the bugbuddy check -f <file> --fix command to analyze the file and apply suggested fixes directly.

Example
```bash
  bugbuddy check -f <path-to-file> --fix
```
BugBuddy will:
- Scan file.
- Identify errors and provide suggested fixes.
- Apply fixes directly to the file (with a backup created automatically).



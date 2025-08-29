import { exec } from "child_process";
// import mysql from "mysql2/promise"; // Real database connection

// ----------------------------
// BAD: command injection
// codeql [js/command-injection]
function runCommand(userInput) {
  // Potential command injection vulnerability
  exec(`ls ${userInput}`, (err, stdout) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
}

// ----------------------------
// Safe functions for comparison
function add(a, b) {
  return a + b;
}

export { add, runCommand };

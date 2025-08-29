import { exec } from "child_process";

// BAD: command injection vulnerability
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

// BAD: SQL injection vulnerability
// codeql [js/sql-injection]
function unsafeQuery(userInput, db) {
  // Potential SQL injection vulnerability
  db.query(
    "SELECT * FROM users WHERE name = '" + userInput + "'",
    (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(result);
    }
  );
}

// BAD: unsafe eval usage
// codeql [js/eval-detected]
function runUserCode(userCode) {
  // Potential unsafe eval usage
  eval(userCode);
}

function add(a, b) {
  return a + b;
}

function safeQuery(userInput, db) {
  db.query("SELECT * FROM users WHERE name = ?", [userInput], (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(result);
  });
}

export { runUserCode, add, safeQuery, runCommand, unsafeQuery };

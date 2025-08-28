import { exec } from "child_process";

// BAD: command injection vulnerability
function runCommand(userInput) {
  exec(`ls ${userInput}`, (err, stdout) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
}

// BAD: SQL injection vulnerability
function unsafeQuery(userInput, db) {
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
function runUserCode(userCode) {
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

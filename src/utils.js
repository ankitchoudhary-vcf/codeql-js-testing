import { exec } from "child_process";
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
// BAD: SQL injection
// codeql [js/sql-injection]
const mysql = {
  query: (sql) => {
    /* pretend this is SQL */
  },
};

function unsafeQuery(userInput) {
  mysql.query("SELECT * FROM users WHERE name = '" + userInput + "'");
}

// ----------------------------
// BAD: unsafe eval
// codeql [js/eval-detected]
function runUserCode(userCode) {
  // Potential unsafe eval usage
  eval(userCode);
}

// ----------------------------
// Safe functions for comparison
function add(a, b) {
  return a + b;
}

async function safeQuery(userInput) {
  const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "test",
  });
  await db.query("SELECT * FROM users WHERE name = ?", [userInput]); // Safe parameterized query
}

export { add, runCommand };

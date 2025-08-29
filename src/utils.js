import { exec } from "child_process";
import mysql from "mysql2/promise"; // Real database connection

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
async function unsafeQuery(userInput) {
  // Realistic database connection
  const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "test",
  });

  // Vulnerable query: concatenating user input
  await db.query("SELECT * FROM users WHERE name = '" + userInput + "'");
}

// // ----------------------------
// // BAD: unsafe eval
// // codeql [js/eval-detected]
// function runUserCode(userCode) {
//   // Potential unsafe eval usage
//   eval(userCode);
// }

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

export { add, runCommand, safeQuery, unsafeQuery };

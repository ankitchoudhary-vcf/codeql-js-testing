# CodeQL JavaScript Demo

This repository is a simple test project to demonstrate how to use **GitHub CodeQL** for code scanning.

## 📌 About

- Contains a few basic JavaScript functions (some intentionally insecure).
- Configured with a GitHub Action that runs **CodeQL analysis** whenever a new **release** is published.
- Results are available in the repository's **Security > Code scanning alerts** tab.

## 📂 Project Structure

```
codeql-js-demo/
├── .github/
│   └── workflows/
│       └── codeql-analysis.yml   # GitHub Action for CodeQL
├── src/
│   └── utils.js                  # Sample functions (one insecure with eval)
├── package.json
└── README.md
```

## ⚡ Example Code

```javascript
// BAD: insecure, CodeQL should flag this
function runUserCode(input) {
  return eval(input);
}

// GOOD: simple safe function
function add(a, b) {
  return a + b;
}
```

## 🚀 Running the Workflow

1. Push the repo to GitHub.
2. Go to **Releases** → **Draft a new release** → **Publish**.
3. GitHub Actions will trigger the **CodeQL Analysis** workflow.
4. Check results in:  
   **Security** → **Code scanning alerts**

## 🔍 Expected Alerts

- CodeQL should detect the usage of `eval()` in `runUserCode`.

## 🛠 Custom Queries (Optional)

You can add your own `.ql` query files in the repo and configure the workflow to use them for detecting project-specific patterns.

---

👨‍💻 **Next Steps**

- Try modifying `utils.js` to add more bad patterns (like `child_process.exec` in Node.js).
- Add custom CodeQL queries for stricter rules.
- Integrate this into a real project for CI/CD scanning.

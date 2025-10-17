## 🧭 Contributing to RemoteVars

Thanks for taking the time to contribute to **RemoteVars**! 🎉  
This project aims to simplify environment variable management by fetching configs from remote sources like GitHub, HTTP, or local files — no more messy `.env` files everywhere.

We’re excited to have your ideas, feedback, and code improvements!

---

### 🧩 Getting Started

1. **Fork** the repository  
2. **Clone** your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/remotevars.git
   cd remotevars
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Run tests:**
   ```bash
   npm test
   ```

---

### 🧪 Development Workflow

- Create a new branch for each feature or fix:
  ```bash
  git checkout -b feat/add-new-provider
  ```
- Follow existing **code style** and structure.
- Make sure all **tests pass** before opening a PR.
- Add **tests** for any new functionality.
- Update documentation if needed (`README.md`, comments, etc).

---

### 🧠 Project Structure

```
src/
├── cli.js             # CLI entry point
├── index.js           # Main module entry
├── core/              # Core logic (cache, loader)
├── providers/         # Supported providers (GitHub, HTTP, Local)
└── tests/             # Jest test suite
```

---

### 💬 Submitting Changes

1. **Commit** messages should be clear and descriptive:
   - `feat: add github provider support`
   - `fix: handle missing .remotevars.json gracefully`
   - `docs: update CLI usage examples`

2. **Push** your branch:
   ```bash
   git push origin feat/add-new-provider
   ```

3. Open a **Pull Request** on GitHub and describe:
   - What problem it solves
   - How to test it
   - Any potential caveats or improvements

---

### 🧰 Suggestions Welcome

Have an idea for:
- A new provider (e.g., AWS SSM, GCP Secrets, etc.)?
- Integration with a specific framework?
- CLI improvements?

Open an **issue** or start a **discussion** — we’d love to collaborate.

---

### 💖 Code of Conduct

Please keep the discussion respectful and constructive.  
This project follows the [Contributor Covenant](https://www.contributor-covenant.org/).

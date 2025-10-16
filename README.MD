# 🌐 RemoteVars

**RemoteVars** is a modern Node.js library and CLI tool that lets you manage environment variables from remote sources — like GitHub, HTTP endpoints, or local JSON files — eliminating the need for `.env` files in your projects.

---

## 🚀 Features

- 🔒 Load configuration securely from:
  - GitHub repositories (private or public)
  - HTTP(S) endpoints
  - Local JSON files
- 🧠 Optional local cache for offline resilience
- ⚙️ CLI tool for pulling, printing, and loading variables
- 💻 Works with Node.js, Express, React, or any framework
- ☁️ Perfect for distributed teams and CI/CD setups

---

## 📦 Installation

```bash
npm install -g remotevars
```

or for local development:

```bash
npm install remotevars --save-dev
```

---

## 🧮 Usage

### 1️⃣ Basic CLI Usage

#### Pull environment variables and save them to `.env.local`:

```bash
npx remotevars pull --provider=github --repo=myorg/configs --path=envs/dev.json
```

#### Load variables directly into `process.env` (in-memory):

```bash
npx remotevars load --provider=http --url=https://example.com/config.json
```

#### Print variables to console (for debugging):

```bash
npx remotevars print --provider=local --path=./envs/dev.json
```

#### Clear local cache:
```bash
npx remotevars clear-cache
```

---

### 2️⃣ `.remotevars.json` Configuration File

Create a `.remotevars.json` in your project root to define your preferred provider(s):

```json
{
  "defaultProvider": "github",
  "useCache": true,
  "github": {
    "repo": "myorg/myconfigs",
    "path": "envs/dev.json",
    "branch": "main",
    "token": "ghp_XXXXXXX"
  },
  "http": {
    "url": "https://example.com/config.json"
  },
  "local": {
    "path": "./envs/dev.json"
  }
}
```

---

## ⚡ Disabling Cache

You can disable the caching system globally or per command.

### Option 1: In the `.remotevars.json`
```json
{
  "useCache": false
}
```

### Option 2: CLI flag
```bash
npx remotevars pull --no-cache
```

When cache is disabled, RemoteVars always fetches fresh data from the provider and never stores or reads from the cache.

---

## 🧙‍♂️ Supported Providers

| Provider | Description | Required Options |
|-----------|--------------|------------------|
| **github** | Fetch from a GitHub repository | `repo`, `path`, optional `branch`, `token` |
| **http** | Fetch from any HTTP/HTTPS endpoint returning JSON | `url` |
| **local** | Load from a local JSON file | `path` |

---

## 🧱 Programmatic Usage (Node.js API)

You can also use `RemoteVars` directly in your code:

```js
import { loadRemoteVars } from "remotevars";

await loadRemoteVars({
  provider: "github",
  repo: "myorg/myconfigs",
  path: "envs/dev.json",
  token: process.env.GH_TOKEN,
  useCache: false
});

console.log(process.env.API_KEY);
```

---

## 🥪 Testing

Run unit tests:

```bash
npm test
```

---

## 🗺️ Roadmap

- 🔐 Add encrypted secrets support
- ☁️ Add AWS S3 and GCP provider support
- 🧩 Add `.remotevarsrc` global configuration

---

## 🧑‍💻 Author

Created by **Jose R. Garcia**  
📦 GitHub: [@jrgf](https://github.com/jrgf)

---

## 🪪 License

MIT License — feel free to use, modify, and distribute.

---

**RemoteVars** — *Your environment, remotely controlled.*

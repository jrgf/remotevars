#!/usr/bin/env node
// src/cli.js
import { loadRemoteVars } from "./core/loader.js";
import * as cache from "./core/cache.js";
import fs from "fs/promises";
import path from "path";


const [, , command = "pull", ...rest] = process.argv;

const args = Object.fromEntries(
  rest.filter((arg) => arg.startsWith("--")).map((arg) => {
    const separator = arg.indexOf("=");
    return separator === -1
      ? [arg.slice(2), true]
      : [arg.slice(2, separator), arg.slice(separator + 1)];
  })
);

const env = args.env || rest.find((arg) => !arg.startsWith("--")) || "dev";


let config = {};
try {
  const configFile = await fs.readFile(".remotevars.json", "utf8");
  config = JSON.parse(configFile);
} catch (err) {
  if (err.code !== "ENOENT") throw new Error(`Invalid .remotevars.json: ${err.message}`);
  console.warn("⚠️ .remotevars.json not found, using CLI options only.");
}


const provider = args.provider || config.defaultProvider || "github";

const useCache = args["no-cache"] || config.useCache === false ? false : true;

const opts = { ...config[provider], ...args, provider, env, useCache };


async function run() {
  switch (command) {
    case "pull": {
      const vars = await loadRemoteVars(opts);
      const envPath = path.resolve(".env.local");
      const content = `${Object.entries(vars)
        .map(([key, value]) => `${key}=${JSON.stringify(value)}`)
        .join("\n")}\n`;
      await fs.writeFile(envPath, content, { encoding: "utf8", mode: 0o600 });
      await fs.chmod(envPath, 0o600);
      console.log(`💾 Saved ${Object.keys(vars).length} vars to .env.local`);
      break;
    }

    case "load": {
      const vars = await loadRemoteVars(opts);
      Object.entries(vars).forEach(([k, v]) => (process.env[k] = v));
      console.log(
        `✅ Loaded ${Object.keys(vars).length} vars into process.env`
      );
      break;
    }

    case "print": {
      const vars = await loadRemoteVars(opts);
      console.log(JSON.stringify(vars, null, 2));
      break;
    }

    case "clear-cache": {
      await cache.clear();
      break;
    }

    default:
      console.error(`❌ Unknown command: ${command}`);
      console.log("Available commands: pull, load, print, clear-cache");
      process.exit(1);
  }
}

run().catch((err) => {
  console.error("❌ CLI error:", err.message);
  process.exit(1);
});

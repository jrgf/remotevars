// src/providers/local.js
import fs from "fs/promises";
import path from "path";

export async function fetchConfig({ filePath }) {
  if (!filePath) throw new Error("Local provider requires 'filePath'.");

  const resolved = path.resolve(filePath);
  const content = await fs.readFile(resolved, "utf8");
  return JSON.parse(content);
}

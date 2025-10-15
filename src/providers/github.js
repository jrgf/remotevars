// src/providers/github.js
import fetch from "node-fetch";

export async function fetchConfig({ repo, path, branch = "main", token }) {
  if (!repo || !path)
    throw new Error("GitHub provider requires 'repo' and 'path'.");

  const url = `https://api.github.com/repos/${repo}/contents/${path}?ref=${branch}`;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`GitHub: ${res.statusText}`);

  const json = await res.json();
  const decoded = Buffer.from(json.content, "base64").toString("utf8");
  return JSON.parse(decoded);
}

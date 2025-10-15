// src/providers/http.js
import fetch from "node-fetch";

export async function fetchConfig({ url, token }) {
  if (!url) throw new Error("HTTP provider requires 'url'.");

  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`HTTP: ${res.statusText}`);

  return await res.json();
}

// src/providers/http.js
export async function fetchConfig({ url, token }) {
  if (!url) throw new Error("HTTP provider requires 'url'.");

  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`HTTP: ${res.status} ${res.statusText}`);

  return await res.json();
}

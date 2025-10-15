// src/core/cache.js
import fs from "fs/promises";
import path from "path";

const CACHE_FILE = path.resolve(".remotevars.cache.json");

/**
 * Save the configuration on a local file
 * @param {Object} config - Config to save
 */
export async function save(config) {
  try {
    await fs.writeFile(CACHE_FILE, JSON.stringify(config, null, 2), "utf8");
  } catch (err) {
    console.warn(`⚠️ Failed to save cache: ${err.message}`);
  }
}

/**
 * Loads the configuration from a local file
 * @returns {Object|null} Loaded config, null if the config doesn't exist
 */
export async function load() {
  try {
    const data = await fs.readFile(CACHE_FILE, "utf8");
    return JSON.parse(data);
  } catch {
    return null; // no hay cache disponible
  }
}

/**
 * Clear the cache file
 */
export async function clear() {
  try {
    await fs.rm(CACHE_FILE, { force: true });
    console.log("🧹 Cache cleared");
  } catch (err) {
    console.warn(`⚠️ Failed to clear cache: ${err.message}`);
  }
}

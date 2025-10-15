import * as github from "../providers/github.js";
import * as http from "../providers/http.js";
import * as local from "../providers/local.js";
import * as cache from "./cache.js"

const providers = { github, http, local };

/**
 * Load the envirorment vars given the provider
 * @param {Object} options Opciones de configuración { provider, env, repo, path, url, token, ... }
 * @returns {Object} Loaded configs
 */
export async function loadRemoteVars(options = {}) {
  const { provider = "http" } = options;
  const mod = providers[provider];

  if (!mod) throw new Error(`Unknown provider: ${provider}`);
  try {
    const config = await mod.fetchConfig(options);
    Object.entries(config).forEach(([k, v]) => {
      process.env[k] = v;
    });
   
    await cache.save(config);

    console.log(`✅ Loaded ${Object.keys(config).length} vars from ${provider}`);
    return config;
  } catch (err) {
    console.warn(`⚠️ Failed to load from ${provider}: ${err.message}`);

    const cached = await cache.load();
    if (cached) {
      Object.entries(cached).forEach(([k, v]) => (process.env[k] = v));
      console.log("♻️ Loaded vars from cache");
      return cached;
    }

    throw err; 
  }
}

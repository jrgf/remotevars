import * as github from "../providers/github.js";
import * as http from "../providers/http.js";
import * as local from "../providers/local.js";
import * as cache from "./cache.js";

const providers = { github, http, local };
const ENV_NAME = /^[A-Za-z_][A-Za-z0-9_]*$/;

function normalizeConfig(config) {
  if (!config || typeof config !== "object" || Array.isArray(config)) {
    throw new Error("Provider config must be an object.");
  }

  return Object.fromEntries(
    Object.entries(config).map(([key, value]) => {
      if (!ENV_NAME.test(key)) {
        throw new Error(`Invalid environment variable name: ${key}`);
      }
      if (!["string", "number", "boolean"].includes(typeof value)) {
        throw new Error(`Environment variable '${key}' must be a scalar value.`);
      }
      return [key, String(value)];
    })
  );
}

function applyConfig(config) {
  Object.assign(process.env, config);
}

/**
 * Load the envirorment vars given the provider
 * @param {Object} options Opciones de configuración { provider, env, repo, path, url, token, useCache... }
 * @returns {Object} Loaded configs
 */
export async function loadRemoteVars(options = {}) {
  const { provider = "http", useCache = false } = options;
  const mod = providers[provider];

  if (!mod) throw new Error(`Unknown provider: ${provider}`);
  try {
    const config = normalizeConfig(await mod.fetchConfig(options));
    applyConfig(config);
   
    if (useCache) {
      await cache.save(config);
    }

    console.log(`✅ Loaded ${Object.keys(config).length} vars from ${provider}`);
    return config;
  } catch (err) {
    console.warn(`⚠️ Failed to load from ${provider}: ${err.message}`);

    if (useCache) {
      const cached = await cache.load();
      if (cached) {
        const config = normalizeConfig(cached);
        applyConfig(config);
        console.log("♻️ Loaded vars from cache");
        return config;
      }
    }

    throw err;
  }
}

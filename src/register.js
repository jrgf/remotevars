// src/register.js
import { loadRemoteVars } from "./core/loader.js";
import fs from "fs";

(async () => {
  try {
    
    let config = {};
    if (fs.existsSync(".remotevars.json")) {
      config = JSON.parse(fs.readFileSync(".remotevars.json", "utf8"));
    }

    const provider = config.defaultProvider || "github";
    const env = process.env.NODE_ENV || config.defaultEnv || "dev";

    
    const opts = { ...config[provider], provider, env };

    
    const vars = await loadRemoteVars(opts);

    
    Object.entries(vars).forEach(([k, v]) => {
      process.env[k] = v;
    });

    console.log(
      `⚙️ RemoteVars loaded ${
        Object.keys(vars).length
      } vars (${provider}:${env})`
    );
  } catch (err) {
    console.warn("⚠️ RemoteVars preload failed:", err.message);
  }
})();

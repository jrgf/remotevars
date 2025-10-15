import { loadRemoteVars } from "../src/core/loader.js";
import * as cache from "../src/core/cache.js";

describe("Loader", () => {
  afterEach(async () => {
    await cache.clear();
  });

  it("Loads the var from local ", async () => {
    const vars = await loadRemoteVars({
      provider: "local",
      filePath: "./tests/test-config.json",
    });

    expect(vars).toHaveProperty("TEST_VAR");
    expect(vars.TEST_VAR).toBe("123");
    expect(process.env.TEST_VAR).toBe("123");
  });

  it("Use cache if fetching fails", async () => {
    // guarda algo en cache
    await cache.save({ CACHED_VAR: "cached" });

    const vars = await loadRemoteVars({
      provider: "local",
      filePath: "./tests/nonexistent.json",
    });

    expect(vars).toHaveProperty("CACHED_VAR");
    expect(vars.CACHED_VAR).toBe("cached");
  });
});

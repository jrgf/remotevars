import { loadRemoteVars } from "../src/core/loader.js";
import * as cache from "../src/core/cache.js";

describe("Loader", () => {
  afterEach(async () => {
    await cache.clear();
  });

  it("loads and normalizes scalar values", async () => {
    const vars = await loadRemoteVars({
      provider: "local",
      filePath: "./tests/test-config.json",
      useCache: true,
    });

    expect(vars.TEST_VAR).toBe("123");
    expect(vars.NUMBER_VAR).toBe("42");
    expect(vars.BOOLEAN_VAR).toBe("false");
    expect(process.env.TEST_VAR).toBe("123");
  });

  it("uses cache if fetching fails", async () => {
    await cache.save({ CACHED_VAR: "cached" });

    const vars = await loadRemoteVars({
      provider: "local",
      filePath: "./tests/nonexistent.json",
      useCache: true,
    });

    expect(vars).toHaveProperty("CACHED_VAR");
    expect(vars.CACHED_VAR).toBe("cached");
  });

  it("rejects non-scalar values", async () => {
    await expect(
      loadRemoteVars({ provider: "local", filePath: "./package.json" })
    ).rejects.toThrow("must be a scalar value");
  });
});

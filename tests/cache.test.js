import * as cache from "../src/core/cache.js";
import fs from "fs/promises";

describe("Cache", () => {
  afterEach(async () => {
    await cache.clear();
  });

  it("Saves and load correctly", async () => {
    const testData = { VAR: "val" };
    await cache.save(testData);

    const loaded = await cache.load();
    expect(loaded.VAR).toBe("val");
    if (process.platform !== "win32") {
      expect((await fs.stat(".remotevars.cache.json")).mode & 0o777).toBe(0o600);
    }
  });

  it("clear delete the file correctly", async () => {
    const testData = { VAR: "val" };
    await cache.save(testData);

    await cache.clear();
    const loaded = await cache.load();
    expect(loaded).toBeNull();
  });
});

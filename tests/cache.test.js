import * as cache from "../src/core/cache.js";

describe("Cache", () => {
  afterEach(async () => {
    await cache.clear();
  });

  it("Saves and load correctly", async () => {
    const testData = { VAR: "val" };
    await cache.save(testData);

    const loaded = await cache.load();
    expect(loaded.VAR).toBe("val");
  });

  it("clear delete the file correctly", async () => {
    const testData = { VAR: "val" };
    await cache.save(testData);

    await cache.clear();
    const loaded = await cache.load();
    expect(loaded).toBeNull();
  });
});

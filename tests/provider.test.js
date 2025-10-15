import { fetchConfig as fetchLocal } from "../src/providers/local.js";

describe("Providers", () => {
  it("local provider carga JSON correctamente", async () => {
    const vars = await fetchLocal({ filePath: "./tests/test-config.json" });
    expect(vars.TEST_VAR).toBe("123");
  });
});

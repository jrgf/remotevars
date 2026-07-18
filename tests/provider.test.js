import { fetchConfig as fetchLocal } from "../src/providers/local.js";
import { fetchConfig as fetchHttp } from "../src/providers/http.js";
import { fetchConfig as fetchGitHub } from "../src/providers/github.js";

describe("Providers", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("loads local JSON using the canonical option", async () => {
    const vars = await fetchLocal({ filePath: "./tests/test-config.json" });
    expect(vars.TEST_VAR).toBe("123");
  });

  it.each([
    ["HTTP", fetchHttp, { url: "https://example.com/config.json" }],
    ["GitHub", fetchGitHub, { repo: "acme/config", path: "env.json" }],
  ])("reports %s response errors", async (name, fetchConfig, options) => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 401,
      statusText: "Unauthorized",
    });

    await expect(fetchConfig(options)).rejects.toThrow(`${name}: 401 Unauthorized`);
  });
});

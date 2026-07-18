import { execFile } from "child_process";
import fs from "fs/promises";
import os from "os";
import path from "path";
import { promisify } from "util";

const run = promisify(execFile);
const cli = path.resolve("src/cli.js");

it("pulls a local file when the first argument is a flag", async () => {
  const cwd = await fs.mkdtemp(path.join(os.tmpdir(), "remotevars-"));
  const source = path.join(cwd, "vars.json");

  try {
    await fs.writeFile(
      source,
      JSON.stringify({ PLAIN: "value", MULTILINE: "first\nsecond" })
    );
    await run(process.execPath, [cli, "pull", "--provider=local", `--filePath=${source}`], {
      cwd,
    });

    const output = path.join(cwd, ".env.local");
    expect(await fs.readFile(output, "utf8")).toBe(
      'PLAIN="value"\nMULTILINE="first\\nsecond"\n'
    );
    if (process.platform !== "win32") {
      expect((await fs.stat(output)).mode & 0o777).toBe(0o600);
    }
  } finally {
    await fs.rm(cwd, { recursive: true, force: true });
  }
});

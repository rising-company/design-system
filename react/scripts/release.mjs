// Packs @rising/ui into ../ui/rising-ui-<version>.tgz, which the design-system
// site serves at https://design-system.rising.company/ui/. Products depend on
// that URL, so a published version is immutable: this refuses to overwrite it.
// Bump "version" in package.json for every release.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, renameSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const { version } = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const outDir = join(root, "..", "ui");
const target = join(outDir, `rising-ui-${version}.tgz`);

if (existsSync(target)) {
  console.error(`ui/rising-ui-${version}.tgz is already published. Bump the version in react/package.json.`);
  process.exit(1);
}

const run = (cmd, args) => execFileSync(cmd, args, { cwd: root, stdio: "inherit" });
run("npm", ["test"]);
run("npm", ["run", "typecheck"]);
run("npm", ["run", "build"]);
mkdirSync(outDir, { recursive: true });
const packed = execFileSync("npm", ["pack", "--silent"], { cwd: root, encoding: "utf8" }).trim().split("\n").pop();
renameSync(join(root, packed), target);
console.log(`Published locally: ui/rising-ui-${version}.tgz — commit it; the site serves it once merged.`);

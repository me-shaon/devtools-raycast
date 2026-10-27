// Copies the tool list from the DevTools app's registry into src/tools.json. The extension uses
// this list only when the installed app has not written its own (DevTools 2.0 and earlier).
// Usage: npm run sync-tools -- [path to the devtools repo]   (default: ../devtools)
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const appRepo = path.resolve(process.argv[2] ?? "../devtools");
const registry = readFileSync(path.join(appRepo, "src/app/toolRegistry.ts"), "utf8");
const entry =
  /\{\s*icon:\s*\w+,\s*name:\s*"([^"]+)",\s*id:\s*"([^"]+)",\s*category:\s*"([^"]+)"(?:,\s*keywords:\s*\[([^\]]*)\])?\s*\}/g;
const tools = [...registry.matchAll(entry)].map(([, name, id, category, keywords = ""]) => ({
  id,
  name,
  category,
  keywords: [...keywords.matchAll(/"([^"]+)"/g)].map(([, keyword]) => keyword),
}));

if (tools.length === 0) {
  throw new Error(`No tools found in ${appRepo}/src/app/toolRegistry.ts. Check the path.`);
}

const output = new URL("../src/tools.json", import.meta.url);
writeFileSync(output, `${JSON.stringify(tools, null, 2)}\n`);
// Match the repo's Prettier style so that ray lint passes after a sync.
execFileSync("npx", ["prettier", "--write", output.pathname], { stdio: "ignore" });
console.log(`Wrote ${tools.length} tools to src/tools.json.`);

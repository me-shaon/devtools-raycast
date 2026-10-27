// Copies the tool list from the DevTools app's registry into src/tools.json.
// Usage: npm run sync-tools -- [path to the devtools repo]   (default: ../devtools)
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const appRepo = path.resolve(process.argv[2] ?? "../devtools");
const registry = readFileSync(path.join(appRepo, "src/app/toolRegistry.ts"), "utf8");
const entry = /\{\s*icon:\s*\w+,\s*name:\s*"([^"]+)",\s*id:\s*"([^"]+)",\s*category:\s*"([^"]+)"\s*\}/g;
const tools = [...registry.matchAll(entry)].map(([, name, id, category]) => ({ id, name, category }));

if (tools.length === 0) {
  throw new Error(`No tools found in ${appRepo}/src/app/toolRegistry.ts. Check the path.`);
}

writeFileSync(new URL("../src/tools.json", import.meta.url), `${JSON.stringify(tools, null, 2)}\n`);
console.log(`Wrote ${tools.length} tools to src/tools.json.`);

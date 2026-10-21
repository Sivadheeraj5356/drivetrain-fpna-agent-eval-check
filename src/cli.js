#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { checkFpnaAgentEval } from "./eval-check.js";

const [evaluationPath] = process.argv.slice(2);
if (!evaluationPath) {
  console.error("Usage: npm run check -- <fpna-agent-evaluation.json>");
  process.exit(1);
}

const evaluation = JSON.parse(await readFile(evaluationPath, "utf8"));
const report = checkFpnaAgentEval(evaluation);
console.log(`FP&A agent evaluation readiness: ${report.score} (${report.ready ? "ready" : "needs work"})`);
for (const check of report.checks) {
  console.log(`${check.passed ? "PASS" : "FAIL"} ${check.id}: ${check.label}`);
  if (!check.passed) console.log(`  Next: ${check.fix}`);
}

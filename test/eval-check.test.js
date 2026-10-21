import test from "node:test";
import assert from "node:assert/strict";
import { checkFpnaAgentEval } from "../src/eval-check.js";

const readyEvaluation = {
  financeTask: "Explain monthly budget variance for one approved test department.",
  dataSource: "Synthetic finance warehouse extract approved for agent evaluation, not live customer data.",
  calculationContract: "Return variance amount, variance percent, top three drivers, source rows, and calculation date.",
  retrievalContext: "Use only budget, actual, and driver tables for the selected month and prior month.",
  toolPermission: "The agent may query the read-only evaluation schema and may not update records or call external services.",
  baseline: "Compare with the deterministic SQL analyst baseline on 12 known variance cases.",
  acceptanceMetric: "Match the baseline on at least 90% of amount and percent calculations with no missing sources.",
  auditEvidence: "Keep prompt version, retrieved rows, tool calls, generated explanation, reviewer decision, and run timestamp.",
  reviewOwner: "FP&A reviewer and engineering owner"
};

test("accepts a complete FP&A agent evaluation", () => {
  const report = checkFpnaAgentEval(readyEvaluation);
  assert.equal(report.ready, true);
  assert.equal(report.score, "10/10");
});

test("rejects a missing finance task", () => {
  const report = checkFpnaAgentEval({ ...readyEvaluation, financeTask: "" });
  assert.equal(report.checks.find((check) => check.id === "financeTask").passed, false);
});

test("rejects a missing calculation contract", () => {
  const report = checkFpnaAgentEval({ ...readyEvaluation, calculationContract: "" });
  assert.equal(report.checks.find((check) => check.id === "calculationContract").passed, false);
});

test("rejects missing tool permission", () => {
  const report = checkFpnaAgentEval({ ...readyEvaluation, toolPermission: "" });
  assert.equal(report.checks.find((check) => check.id === "toolPermission").passed, false);
});

test("requires a measurable acceptance metric", () => {
  const report = checkFpnaAgentEval({ ...readyEvaluation, baseline: "analyst review", acceptanceMetric: "high accuracy" });
  assert.equal(report.checks.find((check) => check.id === "measurable-acceptance").passed, false);
});

test("requires audit evidence and a review owner", () => {
  const report = checkFpnaAgentEval({ ...readyEvaluation, auditEvidence: "logs", reviewOwner: "team" });
  assert.equal(report.checks.find((check) => check.id === "auditEvidence").passed, false);
  assert.equal(report.checks.find((check) => check.id === "reviewOwner").passed, false);
});

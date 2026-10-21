const REQUIRED_FIELDS = [
  ["financeTask", "The evaluation names the FP&A task"],
  ["dataSource", "The evaluation names the approved financial data source"],
  ["calculationContract", "The evaluation defines the exact calculation or response contract"],
  ["retrievalContext", "The evaluation defines the retrieval context and date range"],
  ["toolPermission", "The evaluation states what the agent may and may not execute"],
  ["baseline", "The evaluation names the existing analyst or rules baseline"],
  ["acceptanceMetric", "The evaluation defines a measurable acceptance metric"],
  ["auditEvidence", "The evaluation defines the trace and evidence to keep"],
  ["reviewOwner", "The evaluation names the finance reviewer"]
];

export function checkFpnaAgentEval(evaluation) {
  const checks = REQUIRED_FIELDS.map(([field, label]) => ({
    id: field,
    label,
    passed: typeof evaluation[field] === "string" && evaluation[field].trim().length >= 8,
    fix: `Add a specific ${field} entry before testing the agent.`
  }));

  checks.push({
    id: "measurable-acceptance",
    label: "The baseline or acceptance metric includes a numeric threshold",
    passed: /\d/.test(`${evaluation.baseline || ""} ${evaluation.acceptanceMetric || ""}`),
    fix: "Add a numeric baseline, threshold, or comparison."
  });

  const passed = checks.filter((check) => check.passed).length;
  return {
    ready: passed === checks.length,
    score: `${passed}/${checks.length}`,
    checks
  };
}

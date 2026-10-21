# Drivetrain FP&A Agent Eval Check

A dependency-free Node.js checker for FP&A agent evaluation plans.

Drivetrain's Gen AI internship includes RAG, agentic workflows, and LLM projects for financial planning. This project makes an agent evaluation ready before testing: define the finance task, approved data source, calculation contract, retrieval context, tool permission, baseline, acceptance metric, audit evidence, and reviewer.

## Run

```bash
npm test
npm run check
```

The variance-explanation example uses synthetic data and contains no customer or financial records.

## Output

The CLI prints `PASS` or `FAIL` for each evaluation requirement. A failed item identifies the missing control; it does not invent financial results.

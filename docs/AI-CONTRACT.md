# Pocket Chief AI Contract

## Topic drafting

- Input is limited to owner-supplied notes, image IDs, supplied source metadata, SCORE node, and tags.
- Suspected PHI is rejected before an OpenAI request.
- The model is configurable and defaults to `gpt-5.6-terra` with medium reasoning.
- The Responses API uses strict JSON Schema output.
- The model may select only controlled block types.
- It may not create bibliographic details or cite a source that the owner did not supply.
- Every factual claim is `cited` with one or more supplied source IDs, or `needs_support`.
- Any `needs_support` claim or warning blocks approval.
- Model refusals, invalid schema, or unavailable credentials do not replace the last approved topic.

## Cloze drafting

- Input is a selected educational passage, topic ID, source block IDs, context image, and tags.
- One editable cloze deletion is produced with low reasoning.
- A deterministic, meaningful-subject fallback is available when OpenAI is not configured.
- The duplicate hash is SHA-256 over normalized unclozed text.
- Review is mandatory before export.

## Logging and monitoring

- Do not log raw notes, prompts, model outputs, images, cloze text, or source content.
- Audit events contain action, entity ID, actor, timestamp, and non-content counters only.
- AI routes are rate-limited.
- Suggested production metrics: calls, latency, estimated cost, refusal count, schema failures, PHI blocks, support warnings, approvals, and export success—without content.

## Evaluation after launch

Post-launch hardening adds the deferred 20-generation review, strict performance budgets, automated accessibility suites, and full restore drill.

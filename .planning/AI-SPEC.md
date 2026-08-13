# Pocket Chief AI Contract

## Jobs

- Transform supplied notes and source records into a `TopicDraft` containing only allowed block types.
- Transform a user-selected passage into one editable cloze deletion.

## Model and API

- Use the OpenAI Responses API.
- Default drafting model: `gpt-5.6-terra`, reasoning `medium`.
- Default cloze model: `gpt-5.6-terra`, reasoning `low`.
- Make model slugs configurable through server-only environment variables.
- Require strict JSON-schema output and handle refusals explicitly.

## Safety and Grounding

- Run PHI heuristics before any model request; block suspected names with identifiers, MRNs, dates of birth, phone numbers, emails, or patient-specific narratives.
- Supply stable source IDs to the model. A claim may cite only those IDs.
- Mark unmapped factual claims `needs_support`; approval fails while any remain.
- Never retrieve external medical evidence automatically in v1.
- Never log raw inputs or generated medical text.

## Evaluation

- Schema validity: 100% of accepted outputs validate.
- Citation integrity: 100% of cited source IDs exist in the request.
- Unsupported visibility: every uncited factual block is visibly flagged and blocks approval.
- Human gate: no AI route can create an approved topic version.
- Regression fixture: preserve the choledocholithiasis input and approved output for prompt/model changes.

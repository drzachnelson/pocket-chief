---
name: qbank-notes
description: Use when Zach shares board-review questions (TrueLearn, ABSITE banks, screenshots of stems, answer choices or explanations) and wants them logged, compiled, or kept for later — or asks what the question bank has tested on a topic. Records each question's tested point, keyed answer, and why each distractor is wrong in Pocket Chief Resources/qbank-notes/, so topic authoring can emphasize them. Not for authoring library topics themselves (that is add-topic).
---

# Question-bank notes

Notes live in `Pocket Chief Resources/qbank-notes/<score-section>.md`, one file per SCORE section heading in `score-module-outline.md` (`liver.md`, `biliary.md`, `pancreas.md`...). That folder is gitignored with the rest of `Pocket Chief Resources/`, so a worktree does not have it: use `/Users/dada/Documents/Cowork OS/Pocket Chief/Pocket Chief Resources/qbank-notes/`. Keep it gitignored.

## Rules

- **Paraphrase.** Never paste stems, answer text or explanations verbatim, and never save the screenshots. Record the tested point in your own words (AGENTS.md editorial rule).
- **No PHI.** Stems are fictional, but drop ages and demographics unless they are the clue.
- **Separate keyed from reasoned.** Mark an entry `Key` only once the bank's explanation has been seen. Before that it is `Unkeyed`. If the key contradicts earlier reasoning, rewrite the entry to the key and add a **Trap** line saying what the wrong reasoning was. Those traps are the most valuable lines in the file.

## Entry format

Continue the file's numbering (`LIV-11`, ...). Copy the shape of an existing entry:

- **Target topic:** the SCORE entry it belongs to, plus the existing `src/content/topics/<slug>.ts` if one covers it
- **Tested point:** one or two lines, the fact the question turns on
- **Distractors:** why each wrong answer is wrong, in a clause each
- **Trap:** (optional) what pulled the wrong answer
- **Status:** `Key`/`Unkeyed` · `Pending`/`Emphasized in <slug>`

## When a topic is authored or revised

`add-topic` greps this folder for the topic. Every `Pending` entry whose target matches must land in the topic, as a bolded bullet, a table row, or a `warning` block for traps, and its status flips to `Emphasized in <slug>`. The bank is a citable source: register one `user_notes` source per batch for it (paraphrased, naming the references its explanations cite). Cite the SCORE module, Fiser or the OpenEvidence guide when they carry the point. When only the bank does, keep the point, cite the bank, and run a quick web check. Cite the primary if it confirms; otherwise write that only the bank states it, and use a "Board answer versus current practice" split where the sources disagree.

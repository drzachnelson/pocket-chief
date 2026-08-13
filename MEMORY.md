# Pocket Chief Memory

## Contacts

- Zachery Nelson, MD — product owner and sole intended user; `zachpnw@gmail.com`; GitHub `drzachnelson`.

## Key Decisions

- Pocket Chief is a private, single-user PWA, not a public reference site.
- Authentication uses passwordless email OTP and an allowlisted owner email.
- The primary experience is search and browse; chat and built-in spaced repetition are out of v1.
- Topics follow an editable SCORE hierarchy and can carry personal tags.
- AI composes flexible pages from controlled content blocks. Human approval is required before indexing.
- The visual system is Clinical Atlas: cool neutrals, one cobalt accent, compact dividers, Geist typography, and restrained motion.
- Anki exports use a reviewed cloze card with the relevant section, nearest diagram, and a Pocket Chief deep link.
- Pocket Chief never accepts PHI or patient-specific information.
- V1 is implemented and locally verified. External launch remains pending Supabase/OpenAI credentials, GitHub authentication, and Vercel provisioning; four additional source packets are still needed for the five-topic launch library.

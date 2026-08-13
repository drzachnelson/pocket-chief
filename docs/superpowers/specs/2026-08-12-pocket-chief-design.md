# Pocket Chief Design

Pocket Chief is a private, search-first general surgery PWA for one owner. It uses an editable SCORE hierarchy plus personal tags, flexible pages composed from a controlled block vocabulary, explicit human approval, source-linked claims, offline approved-topic reading, and reviewed Anki cloze export.

The selected Clinical Atlas interface uses cool neutral surfaces, one cobalt accent, compact dividers, Geist typography, moderate radii, system light/dark mode, and motion only for feedback or state transitions. Mobile navigation is Search, Topics, Saved, and Add; desktop adds a compact left rail and contextual topic outline.

The managed architecture is Next.js on Vercel, Supabase Auth/Postgres/private Storage, and the OpenAI Responses API with strict structured outputs. Signup is disabled, only the owner email is allowed, anonymous access is denied, and patient information is blocked before storage or AI processing.

V1 includes the full product workflow and the supplied choledocholithiasis topic. The next four launch topics will be populated from future user-provided source packets.

# Security Notes

- Exactly one lowercase email belongs in `owner_allowlist` and `POCKET_CHIEF_OWNER_EMAIL`.
- Public signup is disabled in Supabase and rejected again by the database trigger.
- Every private table has owner-scoped row-level security.
- Approved topic versions cannot be updated or deleted.
- Approval is performed through a guarded database function and fails when a claim lacks a source.
- Topic media is stored in a non-public bucket under the owner UUID and served with 60-second signed links.
- Service credentials and the owner email stay server-only. The Supabase URL and anon key are browser-safe identifiers; RLS remains the authority.
- All pages return `noindex, nofollow, noarchive`, and the app does not emit raw note content into logs.
- Suspected PHI is blocked before model calls. Pocket Chief is an educational reference, not patient-specific clinical decision support.
- Signing out clears server auth, IndexedDB, Cache Storage, and the service-worker private caches.

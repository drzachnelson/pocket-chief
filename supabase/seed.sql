-- Replace this placeholder before production. Keep the value lowercase.
-- insert into public.owner_allowlist (email) values ('owner@example.com');

-- Supabase Dashboard → Authentication → Providers → Email:
-- 1. Disable public user signup.
-- 2. Keep email OTP / magic-link authentication enabled.
-- 3. Invite exactly the owner email, then set POCKET_CHIEF_OWNER_EMAIL to the same value.

-- The authenticated application idempotently installs the reviewed choledocholithiasis
-- launch topic through public.ensure_launch_topic on the owner's first request.

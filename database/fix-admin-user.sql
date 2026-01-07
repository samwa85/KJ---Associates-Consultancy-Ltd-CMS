-- Enable pgcrypto if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Create the user only if they don't exist
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
)
SELECT 
  '00000000-0000-0000-0000-000000000000', 
  gen_random_uuid(), 
  'authenticated', 
  'authenticated', 
  'admin@kjconsultancy.co.tz', 
  crypt('qwerty7890@', gen_salt('bf')), 
  now(), 
  null, 
  now(), 
  '{"provider":"email","providers":["email"]}', 
  '{}', 
  now(), 
  now(), 
  '', 
  '', 
  '', 
  ''
WHERE NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'admin@kjconsultancy.co.tz'
);

-- 2. If user exists (or was just created), Start Fresh:
-- Reset password and force confirm email
UPDATE auth.users
SET 
    encrypted_password = crypt('qwerty7890@', gen_salt('bf')),
    email_confirmed_at = now(),
    raw_app_meta_data = '{"provider":"email","providers":["email"]}'
WHERE email = 'admin@kjconsultancy.co.tz';

-- 3. Ensure identity exists (Crucial for Supabase Auth to work properly)
INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
)
SELECT 
  gen_random_uuid(), -- Generate a new UUID for the identity
  id,
  format('{"sub":"%s","email":"%s"}', id::text, email)::jsonb,
  'email',
  now(),
  now(),
  now()
FROM auth.users
WHERE email = 'admin@kjconsultancy.co.tz'
AND NOT EXISTS (
    SELECT 1 FROM auth.identities WHERE user_id = auth.users.id
);

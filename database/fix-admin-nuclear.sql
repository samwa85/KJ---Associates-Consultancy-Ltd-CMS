-- Enable pgcrypto if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- NUCLEAR OPTION: DELETE AND RECREATE
-- This removes any corruption in the user's state or identity links.

-- 1. DELETE existing user (and cascades to identities)
DELETE FROM auth.users WHERE email = 'admin@kjconsultancy.co.tz';

-- 2. CREATE user fresh
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
VALUES (
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
);

-- 3. CREATE identity (Critical!)
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
  gen_random_uuid(),
  id,
  format('{"sub":"%s","email":"%s"}', id::text, email)::jsonb,
  'email',
  now(),
  now(),
  now()
FROM auth.users
WHERE email = 'admin@kjconsultancy.co.tz';

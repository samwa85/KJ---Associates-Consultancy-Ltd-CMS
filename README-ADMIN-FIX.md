# CMS Admin Panel Fixes

## Overview
This update resolves the issue where the CMS Admin Panel "Save Project" (and other save operations) were failing to persist data to the Supabase backend. The `api-client.js` layer, which pointed to a non-existent Node.js API, has been replaced with a direct integration of the Supabase JS SDK.

## Changes Made
1.  **Direct Supabase Integration**: 
    - Rewrote `admin/cms-api-sync.js` to use `SupabaseClient` directly.
    - This allows all CRUD (Create, Read, Update, Delete) operations to communicate directly with the Supabase database using Row Level Security (RLS) policies.
    - Authentication is handled via Supabase Auth (email/password).

2.  **Code Cleanup**:
    - Removed `admin/js/api-client.js` from `admin/index.html` as it is no longer needed.
    - Updated `window.logout` logic in `admin/index.html` to properly sign out of Supabase sessions.

3.  **Data Handling**:
    - Frontend data structures (camelCase) are automatically transformed to database columns (snake_case) before saving.
    - Fallback mechanism to `localStorage` is preserved if the Supabase connection is unavailable.

## Usage
1.  **Login**: Access `/admin/` and log in with your admin credentials.
2.  **Manage Content**: Use the "Add Project", "Save Slide", etc., buttons.
    - **Note on Images**: The current system saves image *paths* to the database. For new images, you must still use the "Export Images" feature in the dashboard to download them, and then manually upload them to your server's `/uploads` directory (or Supabase Storage bucket if configured) to ensure they are visible on the public site.
3.  **Logout**: The "Sign Out" button now clears both the local session and the Supabase authentication session.

## Verification
- Create a new project in the Admin Panel.
- Check the `projects` table in Supabase to verify the new record appears.
- Refresh the Admin Panel to ensure the data persists (loaded from Supabase).

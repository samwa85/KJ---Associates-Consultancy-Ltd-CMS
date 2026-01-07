# CMS Configuration Fix Manual

## The Issue
Your CMS was failing to Create/Edit/Delete because:
1.  **Missing Columns**: The database tables were missing columns that the frontend was trying to save (e.g., `category` vs `sector`, `position` vs `role`).
2.  **RLS Policies**: Security policies might have been too restrictive or misconfigured.

## The Solution
I have created a **Master Fix Script** that resolves both issues in one go.

### Instructions

1.  **Open Supabase SQL Editor**:
    *   URL: [Supabase SQL Editor](https://supabasekong-j8k8sksckccs4ccogsscccww.31.97.79.197.sslip.io/project/_/sql)

2.  **Run the Fix Script**:
    *   Copy the entire content of `database/cms-master-fix.sql` (located in your project folder).
    *   Paste it into the SQL Editor.
    *   Click **Run**.

3.  **Verify**:
    *   Go back to your CMS Admin (`admin/index.html`).
    *   Refresh the page.
    *   Try to **Add a New Project**. It should now work perfectly.

### What the Script Does
*   **Adds Missing Columns**: Checks for `category`, `slug`, `position`, `phone`, `logo_url`, `client_name`, `content`, etc., and adds them if missing.
*   **Syncs Data**: Copies data from old columns (like `sector`) to new columns (like `category`) so you don't lose anything.
*   **Fixes Permissions**: Sets strict but functional rules:
    *   **Public**: Can READ everything (so your website works).
    *   **Admin (You)**: Can CREATE, UPDATE, DELETE everything.

### Troubleshooting
If you still see errors, check the Browser Console (F12) for specific messages.

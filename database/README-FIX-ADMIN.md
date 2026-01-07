# fix-admin-user.sql

This SQL script is designed to resolve `Invalid login credentials` errors by manually forcing the creation and configuration of the admin user in the Supabase database.

## Instructions

1.  **Open Supabase SQL Editor:**
    *   Go to your local or hosted Supabase Dashboard.
    *   Navigate to the **SQL Editor** tab.

2.  **Run the Script:**
    *   Copy the contents of `database/fix-admin-user.sql`.
    *   Paste it into the query editor.
    *   Click **Run**.

3.  **Try Logging In:**
    *   Go back to the CMS Admin login page (`admin/index.html`).
    *   Refresh the page.
    *   Login with:
        *   **Email:** `admin@kjconsultancy.co.tz`
        *   **Password:** `qwerty7890@`

## What this script does
*   **Creates the user** if they don't exist.
*   **Resets the password** to `qwerty7890@` using safe bcrypt hashing (`pgcrypto`).
*   **Auto-confirms the email** (`email_confirmed_at = now()`) so you don't need to check any inbox.
*   **Creates the Identity** record which connects the user to the email provider (a common missing step in manual creation).

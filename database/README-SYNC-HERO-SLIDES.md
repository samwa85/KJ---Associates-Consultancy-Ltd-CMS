# Hero Slides Database Sync

## Problem

The CMS Admin Panel shows **0 Hero Slides** because the slides table in Supabase is empty. The default hero slides exist in the frontend code (`js/main.js`) but haven't been synced to the database yet.

## Solution

Run the `sync-hero-slides.sql` script to populate the `slides` table with the default hero slides.

## Steps to Fix

### 1. Access Supabase SQL Editor

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**

### 2. Run the Sync Script

Copy and paste the contents of `sync-hero-slides.sql` into the SQL Editor and click **Run**.

The script will:
- ✅ Check if the `slides` table exists
- ✅ Add any missing columns (tagline, title, title_highlight, button_text, button_link, image, active, display_order)
- ✅ Insert 5 default hero slides
- ✅ Display a summary of the sync

### 3. Verify in Admin Panel

1. Open the CMS Admin Panel: `https://kjconsultancy.co.tz/demo/admin/`
2. Login with your credentials
3. The dashboard should now show **5 Hero Slides** instead of 0
4. Click on "Hero Slides" in the sidebar to view and edit them

## What Gets Synced

The script adds these 5 default hero slides:

1. **"Precision Through Digital Tools"**
   - Tagline: BUILD ANYTHING WITH US
   - Button: Contact Us

2. **"Expert Quantity Surveyors"**
   - Tagline: TRUSTED BY WORLD BANK & AfDB
   - Button: Our Services

3. **"Cost Control Expertise"**
   - Tagline: 17+ YEARS OF EXCELLENCE
   - Button: About Us

4. **"Project Management"**
   - Tagline: FROM INCEPTION TO COMPLETION
   - Button: View Projects

5. **"Building The Future"**
   - Tagline: SERVING TANZANIA
   - Button: Get Started

## After Syncing

Once the slides are in the database:
- ✅ The homepage will display the hero slideshow
- ✅ The admin panel will show 5 slides
- ✅ You can edit, add, or delete slides through the CMS
- ✅ Changes will be saved to Supabase and reflected on the live site

## Troubleshooting

### If the script fails:

1. **Check if the `slides` table exists:**
   ```sql
   SELECT * FROM pg_tables WHERE schemaname = 'public' AND tablename = 'slides';
   ```

2. **If the table doesn't exist, create it:**
   ```sql
   CREATE TABLE slides (
       id SERIAL PRIMARY KEY,
       tagline TEXT,
       title TEXT NOT NULL,
       title_highlight TEXT,
       button_text TEXT,
       button_link TEXT,
       image TEXT,
       active BOOLEAN DEFAULT true,
       display_order INTEGER DEFAULT 0,
       created_at TIMESTAMPTZ DEFAULT NOW(),
       updated_at TIMESTAMPTZ DEFAULT NOW()
   );
   ```

3. **Then run the sync script again**

### If slides still show 0 in admin panel:

1. **Check browser console** for errors
2. **Verify database connection** - the green "Database Connected" indicator should be visible
3. **Clear browser cache** and reload the admin panel
4. **Check Supabase RLS policies** - ensure public read access is enabled:
   ```sql
   -- Allow public read access to slides
   CREATE POLICY "Allow public read access to slides"
   ON slides FOR SELECT
   TO public
   USING (true);
   
   -- Allow authenticated users to manage slides
   CREATE POLICY "Allow authenticated users to manage slides"
   ON slides FOR ALL
   TO authenticated
   USING (true)
   WITH CHECK (true);
   ```

## Related Files

- **Sync Script**: `database/sync-hero-slides.sql`
- **Frontend Code**: `js/main.js` (lines 589-639 - default slides)
- **Admin Panel**: `admin/cms-data.js` (slide management)
- **Homepage**: `index.html` (hero slideshow section)

## Next Steps

After syncing the slides:
1. Deploy the script loading order fix (already committed to Git)
2. Test the homepage to ensure slides display correctly
3. Use the admin panel to customize the slides with your own content and images

---

**Status**: Ready to run  
**Last Updated**: 2026-01-08  
**Related Issue**: Hero slides showing zero in CMS Admin Panel

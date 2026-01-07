-- Additional fixes for remaining issues

-- Add display_order columns
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Fix testimonials: make 'name' column nullable since we're using 'client_name' instead
ALTER TABLE testimonials ALTER COLUMN name DROP NOT NULL;

-- Update display_order for existing records
UPDATE team_members SET display_order = 0 WHERE display_order IS NULL;
UPDATE clients SET display_order = 0 WHERE display_order IS NULL;
UPDATE testimonials SET display_order = 0 WHERE display_order IS NULL;

-- Remove duplicate slides (keep only the ones with display_order > 0)
DELETE FROM slides 
WHERE display_order = 0;

-- Verify remaining slides
SELECT 
    id,
    tagline,
    title,
    title_highlight,
    button_text,
    active,
    display_order
FROM slides
ORDER BY display_order;

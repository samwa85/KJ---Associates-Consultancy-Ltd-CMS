/**
 * Supabase Configuration
 * 
 * Inherits from Unified Configuration (API_CONFIG)
 * protected by Row Level Security (RLS) policies in the database.
 */

window.SUPABASE_CONFIG = {
  // Use settings from unified config if available
  url: window.API_CONFIG?.supabaseUrl || 'https://supabasekong-j8k8sksckccs4ccogsscccww.31.97.79.197.sslip.io',
  anonKey: window.API_CONFIG?.supabaseKey || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2NzQyNjU0MCwiZXhwIjo0OTIzMTAwMTQwLCJyb2xlIjoiYW5vbiJ9.SjKT3nG6cTid7fSuOvdy5Mxy8SsGsYPUW1XVZCNR7WY'
};

// Override from meta tags or window overrides if present (legacy support)
(function () {
  const metaUrl = document.querySelector('meta[name="supabase-url"]')?.content;
  const metaKey = document.querySelector('meta[name="supabase-anon-key"]')?.content;

  if (metaUrl) window.SUPABASE_CONFIG.url = metaUrl;
  if (metaKey) window.SUPABASE_CONFIG.anonKey = metaKey;

  // Explicit overrides (highest priority)
  if (window.SUPABASE_URL_OVERRIDE) window.SUPABASE_CONFIG.url = window.SUPABASE_URL_OVERRIDE;
  if (window.SUPABASE_KEY_OVERRIDE) window.SUPABASE_CONFIG.anonKey = window.SUPABASE_KEY_OVERRIDE;
})();


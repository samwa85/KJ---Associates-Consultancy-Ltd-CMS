/**
 * Supabase Configuration
 * 
 * NOTE: Supabase anon keys are designed to be public and safe to expose in client-side code.
 * They are protected by Row Level Security (RLS) policies in the database.
 * However, for better organization, we load them from this config file.
 * 
 * For production, you can override these values via environment variables or server-side injection.
 */

window.SUPABASE_CONFIG = {
  // Default values - can be overridden by meta tags or window.SUPABASE_CONFIG_OVERRIDE
  // Using HTTPS to avoid Mixed Content errors when site is served over HTTPS
  url: 'https://supabasekong-j8k8sksckccs4ccogsscccww.31.97.79.197.sslip.io',
  anonKey: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2NzQyNjU0MCwiZXhwIjo0OTIzMTAwMTQwLCJyb2xlIjoiYW5vbiJ9.SjKT3nG6cTid7fSuOvdy5Mxy8SsGsYPUW1XVZCNR7WY'
};

// Override from meta tags if present (for server-side injection)
(function() {
  const metaUrl = document.querySelector('meta[name="supabase-url"]')?.content;
  const metaKey = document.querySelector('meta[name="supabase-anon-key"]')?.content;
  
  if (metaUrl) window.SUPABASE_CONFIG.url = metaUrl;
  if (metaKey) window.SUPABASE_CONFIG.anonKey = metaKey;
  
  // Override from global config if set (for dynamic configuration)
  if (window.SUPABASE_CONFIG_OVERRIDE) {
    Object.assign(window.SUPABASE_CONFIG, window.SUPABASE_CONFIG_OVERRIDE);
  }
})();


/**
 * Unified Frontend Configuration
 * Centralized master settings for API and Database connection
 */

(function () {
  // 1. Detect Environment
  const isLocalhost = window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.protocol === 'file:';

  // 2. Define API & Supabase URLs based on environment
  // Priority: 
  // - Global overrides (for testing/injection)
  // - Meta tags
  // - Environment defaults

  const config = {
    // API Backend Base URL
    apiBaseUrl: window.API_BASE_URL_OVERRIDE ||
      document.querySelector('meta[name="api-base-url"]')?.content ||
      (isLocalhost ? 'http://localhost:3001/api' : 'https://api.kjconsultancy.co.tz/api'),

    // Supabase Direct URL (for client-side auth/direct access)
    supabaseUrl: window.SUPABASE_URL_OVERRIDE ||
      document.querySelector('meta[name="supabase-url"]')?.content ||
      'https://supabasekong-j8k8sksckccs4ccogsscccww.31.97.79.197.sslip.io',

    // Supabase Anon Key
    supabaseKey: window.SUPABASE_KEY_OVERRIDE ||
      document.querySelector('meta[name="supabase-anon-key"]')?.content ||
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc2NzQyNjU0MCwiZXhwIjo0OTIzMTAwMTQwLCJyb2xlIjoiYW5vbiJ9.SjKT3nG6cTid7fSuOvdy5Mxy8SsGsYPUW1XVZCNR7WY',

    // Sync Secret for database migration
    syncSecret: 'kj-cms-sync-2024-secret',

    // Flags
    useApi: true,
    debug: isLocalhost,
    environment: isLocalhost ? 'development' : 'production'
  };

  // 3. Expose globally
  window.API_CONFIG = config;

  // Legacy support for scripts already using these globals
  window.API_BASE_URL = config.apiBaseUrl;
  window.USE_API = config.useApi;
  window.DEBUG = config.debug;

  console.log(`[Config] Running in ${config.environment} mode`);
  console.log(`[Config] API: ${config.apiBaseUrl}`);
  console.log(`[Config] Supabase: ${config.supabaseUrl}`);
})();


/**
 * Frontend Configuration
 * Configure API endpoints and settings
 */

(function() {
  // Allow overriding via global (e.g., set before this script) or meta tag
  const metaApiBase = document.querySelector('meta[name="api-base-url"]')?.content;
  const globalApiOverride = window.API_BASE_URL_OVERRIDE;

  // Detect environment
  const isLocalhost = window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1' ||
                      window.location.protocol === 'file:';

  // Detect if we're running under /demo path
  const isDemoPath = window.location.pathname.startsWith('/demo');
  
  // API Configuration
  // Priority:
  // 1) Explicit override (window.API_BASE_URL_OVERRIDE)
  // 2) <meta name="api-base-url" content="https://api.example.com/api">
  // 3) Localhost default
  // 4) Production: Coolify server API
  // 5) Same-origin default (/api)
  let apiUrl;
  if (globalApiOverride) {
    apiUrl = globalApiOverride;
  } else if (metaApiBase) {
    apiUrl = metaApiBase;
  } else if (isLocalhost) {
    apiUrl = 'http://localhost:3001/api';
  } else {
    // Production: Use Coolify server API with HTTPS
    apiUrl = 'https://api.kjconsultancy.co.tz/api';
  }
  
  window.API_BASE_URL = apiUrl;

  // Feature flags
  window.USE_API = true;  // Set to false to use localStorage fallback
  
  // Debug mode
  window.DEBUG = isLocalhost;

  console.log(`[Config] Environment: ${isLocalhost ? 'Development' : 'Production'}`);
  console.log(`[Config] API URL: ${window.API_BASE_URL}`);
})();


/**
 * Frontend Configuration
 * Configure API endpoints and settings
 */

(function() {
  // Detect environment
  const isLocalhost = window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1' ||
                      window.location.protocol === 'file:';

  // API Configuration
  window.API_BASE_URL = isLocalhost 
    ? 'http://localhost:3001/api'  // Development
    : '/api';                       // Production (same-origin)

  // Feature flags
  window.USE_API = true;  // Set to false to use localStorage fallback
  
  // Debug mode
  window.DEBUG = isLocalhost;

  console.log(`[Config] Environment: ${isLocalhost ? 'Development' : 'Production'}`);
  console.log(`[Config] API URL: ${window.API_BASE_URL}`);
})();


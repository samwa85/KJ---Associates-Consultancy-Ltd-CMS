/**
 * Error Formatting Utilities
 * Provides consistent error formatting for Supabase and other errors
 */

/**
 * Formats an error object to ensure it has all expected properties
 * @param {Error|Object} error - The error object to format
 * @returns {Object} Formatted error object with formattedError property
 */
function formatError(error) {
    // If error is already formatted, return it
    if (error && typeof error.formattedError === 'string') {
        return error;
    }

    // Extract error message
    let errorMessage = 'An unexpected error occurred';
    
    if (error) {
        if (typeof error.message === 'string' && error.message) {
            errorMessage = error.message;
        } else if (typeof error === 'string') {
            errorMessage = error;
        } else if (error.error) {
            errorMessage = error.error;
        } else {
            try {
                errorMessage = JSON.stringify(error);
            } catch (e) {
                errorMessage = String(error);
            }
        }
    }

    // Create formatted error object
    const formatted = {
        message: errorMessage,
        formattedError: errorMessage, // Ensure formattedError is always a string
        name: error?.name || 'Error',
        code: error?.code || error?.status || null,
        status: error?.status || error?.statusCode || null,
        stack: error?.stack || null,
        originalError: error
    };

    // Handle Supabase-specific errors
    if (error?.message) {
        const msg = error.message.toLowerCase();
        
        // User already exists
        if (msg.includes('already registered') || 
            msg.includes('already exists') || 
            msg.includes('user already registered')) {
            formatted.formattedError = 'An account with this email already exists. Try logging in instead.';
            formatted.message = formatted.formattedError;
        }
        
        // Invalid credentials
        else if (msg.includes('invalid login credentials') || 
                 msg.includes('invalid email') || 
                 msg.includes('invalid password')) {
            formatted.formattedError = 'Invalid email or password';
            formatted.message = formatted.formattedError;
        }
        
        // Network/connection errors
        else if (msg.includes('fetch') || 
                 msg.includes('failed to fetch') ||
                 msg.includes('network error')) {
            // Check for SSL errors
            if (msg.includes('cert') || msg.includes('certificate') || 
                error.name === 'TypeError' && msg.includes('fetch')) {
                formatted.formattedError = 'SSL Certificate Error: Your Supabase instance needs a valid SSL certificate.';
            } else {
                formatted.formattedError = 'Cannot connect to Supabase. Check if the URL is correct and the service is running.';
            }
            formatted.message = formatted.formattedError;
        }
        
        // Validation errors
        else if (msg.includes('invalid_type') || 
                 msg.includes('undefined') ||
                 msg.includes('validation')) {
            formatted.formattedError = 'Supabase Auth service error. Please check your Supabase configuration.';
            formatted.message = formatted.formattedError;
        }
    }

    return formatted;
}

/**
 * Formats an error for display in the UI
 * @param {Error|Object} error - The error object to format
 * @returns {string} HTML-formatted error message
 */
function formatErrorForDisplay(error) {
    const formatted = formatError(error);
    return formatted.formattedError || formatted.message || 'An unexpected error occurred';
}

// Export for use in other files
if (typeof window !== 'undefined') {
    window.formatError = formatError;
    window.formatErrorForDisplay = formatErrorForDisplay;
}

// Export for Node.js/CommonJS
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatError,
        formatErrorForDisplay
    };
}


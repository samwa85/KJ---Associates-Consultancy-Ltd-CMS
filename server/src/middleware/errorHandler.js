/**
 * Centralized Error Handler Middleware
 */

const errorHandler = (err, req, res, next) => {
  // Log error for debugging
  console.error('Error:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    path: req.path,
    method: req.method
  });

  // Supabase specific errors
  if (err.code && err.message) {
    // PostgreSQL/Supabase error codes
    switch (err.code) {
      case '23505': // Unique violation
        return res.status(409).json({
          error: 'Conflict',
          message: 'A record with this value already exists.'
        });
      case '23503': // Foreign key violation
        return res.status(400).json({
          error: 'Bad Request',
          message: 'Referenced record does not exist.'
        });
      case '23502': // Not null violation
        return res.status(400).json({
          error: 'Bad Request',
          message: 'Required field is missing.'
        });
      case 'PGRST116': // No rows returned
        return res.status(404).json({
          error: 'Not Found',
          message: 'The requested resource was not found.'
        });
    }
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      message: err.message,
      details: err.details || undefined
    });
  }

  // Authentication errors
  if (err.name === 'UnauthorizedError' || err.status === 401) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid or missing authentication token.'
    });
  }

  // Forbidden errors
  if (err.status === 403) {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'You do not have permission to perform this action.'
    });
  }

  // Default server error
  const statusCode = err.status || err.statusCode || 500;
  const safeMessage = (typeof err.message === 'string' && err.message) 
    ? err.message 
    : 'An unexpected error occurred.';

  res.status(statusCode).json({
    error: statusCode === 500 ? 'Internal Server Error' : 'Error',
    message: process.env.NODE_ENV === 'development' 
      ? safeMessage
      : 'An unexpected error occurred.',
    formattedError: process.env.NODE_ENV === 'development' 
      ? safeMessage 
      : 'An unexpected error occurred.',
    code: err.code || statusCode,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;


/**
 * Authentication Middleware
 * Handles JWT validation and Supabase Auth integration
 */

const { supabase } = require('../config/supabase');

/**
 * Verify JWT token from Supabase Auth
 */
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'No token provided'
      });
    }

    const token = authHeader.split(' ')[1];

    // Verify token with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid or expired token'
      });
    }

    // Attach user to request
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Authentication failed'
    });
  }
};

/**
 * Optional authentication - doesn't fail if no token
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (!error && user) {
      req.user = user;
      req.token = token;
    }
    
    next();
  } catch (error) {
    // Continue without auth
    next();
  }
};

/**
 * Check if user has admin role
 */
const requireAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Authentication required'
      });
    }

    // Check user role in user_metadata or a roles table
    const isAdmin = req.user.user_metadata?.role === 'admin' || 
                    req.user.app_metadata?.role === 'admin';

    if (!isAdmin) {
      // Alternatively, check against a roles table in Supabase
      const { data: roleData, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', req.user.id)
        .single();

      if (error || roleData?.role !== 'admin') {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'Admin access required'
        });
      }
    }

    next();
  } catch (error) {
    console.error('Admin check error:', error);
    return res.status(500).json({
      error: 'Server Error',
      message: 'Failed to verify admin status'
    });
  }
};

module.exports = {
  verifyToken,
  optionalAuth,
  requireAdmin
};


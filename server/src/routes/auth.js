/**
 * Authentication Routes
 * Handles Supabase Auth operations
 */

const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabase');
const { verifyToken } = require('../middleware/auth');

// Sign up
router.post('/signup', async (req, res, next) => {
  try {
    const { email, password, metadata = {} } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: metadata,
      email_confirm: true
    });

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        id: data.user.id,
        email: data.user.email
      }
    });
  } catch (error) {
    next(error);
  }
});

// Sign in
router.post('/signin', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    res.json({
      success: true,
      message: 'Signed in successfully',
      data: {
        user: {
          id: data.user.id,
          email: data.user.email,
          metadata: data.user.user_metadata
        },
        session: {
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
          expires_at: data.session.expires_at
        }
      }
    });
  } catch (error) {
    if (error.message === 'Invalid login credentials') {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }
    next(error);
  }
});

// Sign out
router.post('/signout', verifyToken, async (req, res, next) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    res.json({
      success: true,
      message: 'Signed out successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Get current user
router.get('/me', verifyToken, async (req, res) => {
  res.json({
    success: true,
    data: {
      id: req.user.id,
      email: req.user.email,
      metadata: req.user.user_metadata,
      created_at: req.user.created_at
    }
  });
});

// Refresh token
router.post('/refresh', async (req, res, next) => {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return res.status(400).json({
        success: false,
        error: 'Refresh token is required'
      });
    }

    const { data, error } = await supabase.auth.refreshSession({
      refresh_token
    });

    if (error) throw error;

    res.json({
      success: true,
      data: {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        expires_at: data.session.expires_at
      }
    });
  } catch (error) {
    next(error);
  }
});

// Request password reset
router.post('/forgot-password', async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required'
      });
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password`
    });

    if (error) throw error;

    res.json({
      success: true,
      message: 'Password reset email sent'
    });
  } catch (error) {
    next(error);
  }
});

// Update password
router.post('/update-password', verifyToken, async (req, res, next) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        error: 'New password is required'
      });
    }

    const { error } = await supabase.auth.updateUser({
      password
    });

    if (error) throw error;

    res.json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Update user metadata
router.patch('/update-profile', verifyToken, async (req, res, next) => {
  try {
    const { metadata } = req.body;

    const { data, error } = await supabase.auth.updateUser({
      data: metadata
    });

    if (error) throw error;

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        id: data.user.id,
        email: data.user.email,
        metadata: data.user.user_metadata
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;


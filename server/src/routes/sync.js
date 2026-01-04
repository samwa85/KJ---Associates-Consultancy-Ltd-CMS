/**
 * Sync Routes
 * Special endpoints for one-time data migration from localStorage to database
 * Uses a secret key for authentication instead of user tokens
 */

const express = require('express');
const cors = require('cors');
const router = express.Router();
const { supabase } = require('../config/supabase');

// Sync secret key - should match the one in the sync tool
const SYNC_SECRET = process.env.SYNC_SECRET || 'kj-cms-sync-2024-secret';

// CORS is handled by the global middleware in src/index.js

// Middleware to verify sync secret
const verifySyncSecret = (req, res, next) => {
  // Always skip verification for OPTIONS preflight requests
  if (req.method === 'OPTIONS') {
    return next();
  }

  const secret = req.headers['x-sync-secret'] || req.headers['X-Sync-Secret'];

  if (!secret || secret !== SYNC_SECRET) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid sync secret'
    });
  }

  next();
};

// Apply to all routes
router.use(verifySyncSecret);

// Generic sync endpoint for any table
router.post('/:table', async (req, res) => {
  try {
    const { table } = req.params;
    const data = req.body;

    // Validate table name
    const allowedTables = ['slides', 'projects', 'team_members', 'board_members', 'clients', 'testimonials', 'services', 'blog_posts', 'certifications'];

    // Map frontend table names to database table names
    const tableMap = {
      'slides': 'slides',
      'projects': 'projects',
      'team': 'team_members',
      'board': 'board_members',
      'clients': 'clients',
      'testimonials': 'testimonials',
      'services': 'services',
      'blog': 'blog_posts',
      'certifications': 'certifications'
    };

    const dbTable = tableMap[table];

    if (!dbTable) {
      return res.status(400).json({
        error: 'Bad Request',
        message: `Invalid table: ${table}. Allowed: ${Object.keys(tableMap).join(', ')}`
      });
    }

    // Insert data
    const { data: result, error } = await supabase
      .from(dbTable)
      .insert(data)
      .select();

    if (error) {
      console.error(`Sync error for ${dbTable}:`, error);
      return res.status(500).json({
        error: 'Database Error',
        message: error.message
      });
    }

    res.status(201).json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Sync error:', error);
    res.status(500).json({
      error: 'Server Error',
      message: error.message
    });
  }
});

// Bulk sync endpoint
router.post('/bulk/:table', async (req, res) => {
  try {
    const { table } = req.params;
    const items = req.body;

    if (!Array.isArray(items)) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Body must be an array of items'
      });
    }

    const tableMap = {
      'slides': 'slides',
      'projects': 'projects',
      'team': 'team_members',
      'board': 'board_members',
      'clients': 'clients',
      'testimonials': 'testimonials',
      'services': 'services',
      'blog': 'blog_posts',
      'certifications': 'certifications'
    };

    const dbTable = tableMap[table];

    if (!dbTable) {
      return res.status(400).json({
        error: 'Bad Request',
        message: `Invalid table: ${table}`
      });
    }

    // Insert all items
    const { data: result, error } = await supabase
      .from(dbTable)
      .insert(items)
      .select();

    if (error) {
      console.error(`Bulk sync error for ${dbTable}:`, error);
      return res.status(500).json({
        error: 'Database Error',
        message: error.message
      });
    }

    res.status(201).json({
      success: true,
      count: result.length,
      data: result
    });

  } catch (error) {
    console.error('Bulk sync error:', error);
    res.status(500).json({
      error: 'Server Error',
      message: error.message
    });
  }
});

module.exports = router;


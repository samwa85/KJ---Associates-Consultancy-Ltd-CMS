/**
 * File Upload Routes
 */

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const { verifyToken } = require('../middleware/auth');
const { supabase } = require('../config/supabase');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const category = req.params.category || 'general';
    const uploadDir = path.join(__dirname, '../../../uploads', category);
    
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    const uniqueId = uuidv4();
    const ext = path.extname(file.originalname);
    const safeName = file.originalname
      .replace(ext, '')
      .replace(/[^a-zA-Z0-9]/g, '-')
      .substring(0, 50);
    cb(null, `${safeName}-${uniqueId}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  // Allow images and documents
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images and documents are allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024 // 10MB default
  }
});

// Upload single file
router.post('/:category', verifyToken, upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }

    const { category } = req.params;
    const fileUrl = `/uploads/${category}/${req.file.filename}`;

    res.json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        filename: req.file.filename,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        url: fileUrl,
        category
      }
    });
  } catch (error) {
    next(error);
  }
});

// Upload multiple files
router.post('/:category/multiple', verifyToken, upload.array('files', 10), async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No files uploaded'
      });
    }

    const { category } = req.params;
    const files = req.files.map(file => ({
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      url: `/uploads/${category}/${file.filename}`,
      category
    }));

    res.json({
      success: true,
      message: `${files.length} files uploaded successfully`,
      data: files
    });
  } catch (error) {
    next(error);
  }
});

// Delete file
router.delete('/:category/:filename', verifyToken, async (req, res, next) => {
  try {
    const { category, filename } = req.params;
    const filePath = path.join(__dirname, '../../../uploads', category, filename);

    try {
      await fs.access(filePath);
      await fs.unlink(filePath);
      
      res.json({
        success: true,
        message: 'File deleted successfully'
      });
    } catch (error) {
      if (error.code === 'ENOENT') {
        return res.status(404).json({
          success: false,
          error: 'File not found'
        });
      }
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

// Upload to Supabase Storage (alternative)
router.post('/supabase/:bucket', verifyToken, upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }

    const { bucket } = req.params;
    const fileBuffer = await fs.readFile(req.file.path);
    const fileName = `${Date.now()}-${req.file.originalname}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, fileBuffer, {
        contentType: req.file.mimetype,
        upsert: false
      });

    // Clean up local file
    await fs.unlink(req.file.path);

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    res.json({
      success: true,
      message: 'File uploaded to Supabase Storage',
      data: {
        path: data.path,
        url: publicUrl
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;


# Uploads Folder

This folder contains all uploaded images organized by category.

## Folder Structure

```
uploads/
├── projects/     # Project images
├── team/         # Team member photos
├── board/         # Board member photos
├── clients/       # Client logos
├── slides/        # Hero slide images
├── blog/          # Blog post images and author photos
└── testimonials/  # Testimonial photos
```

## How It Works

1. **Upload Images in CMS**: When you upload an image in the CMS admin panel, the system automatically generates a file path like:
   - `/uploads/projects/project-name-1.jpg`
   - `/uploads/team/member-name-2.jpg`
   - etc.

2. **Export Images**: Click the "Export Images" button in the CMS dashboard to download all uploaded images.

3. **Save to Folder**: After downloading, save the images to the corresponding subfolder in this directory.

4. **Automatic Processing**: Alternatively, use the `save-uploaded-images.js` script:
   ```bash
   node save-uploaded-images.js
   ```
   This script will automatically extract images from exported CMS data and save them here.

## File Naming Convention

Images are named using the pattern: `{item-name}-{id}.{extension}`

Examples:
- `residential-complex-apartments-1.jpg`
- `john-smith-5.jpg`
- `slide-3.jpg`

## Notes

- All images are stored with their original file extensions
- Base64 images are automatically converted to proper image files
- The CMS will reference these paths in the data
- Make sure to maintain the folder structure for proper image loading


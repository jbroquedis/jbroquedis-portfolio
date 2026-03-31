# Image Management Guide

## How to Add New Project Images

### For Thumbnails:
1. Place your thumbnail image in: `/public/projects/[category]/[project-name]/thumbnail/`
2. Update the thumbnail database in: `src/utils/imageDetection.js` 
3. Add your project and filename to the `knownThumbnails` object

### For Gallery Images:
1. Place your gallery images in: `/public/projects/[category]/[project-name]/gallery/`
2. Update the gallery database in: `src/utils/imageDetection.js`
3. Add your project and image array to the `knownGalleryImages` object

### Current Thumbnails:
- `architecture-project-1`: `Enscape_2024-06-12-19-51-48.jpg`
- `architecture-project-2`: `Enscape_2024-06-14-21-27-01.jpg`
- `architecture-project-3`: `CP_R1b.jpg`
- `architecture-project-5`: `AC_LC R1.jpg`
- `architecture-project-6`: `AC_LS R2.jpg`
- `architecture-project-7`: `MCG_2_6.jpg`

### Gallery Image Ordering:
- Images are sorted **numerically first**, then **alphabetically**
- Example: `image1.jpg`, `image2.jpg`, `image10.jpg`, `final.jpg`
- Number-based sorting: `01_render.jpg` comes before `02_render.jpg`

### To Add More Images:
1. Upload files to the appropriate project folders
2. Edit `src/utils/imageDetection.js`:
   ```javascript
   // Add to knownThumbnails
   'your-project-key': 'your-thumbnail.jpg',
   
   // Add to knownGalleryImages
   'your-project-key': [
     'image1.jpg',
     'image2.jpg', 
     'final.jpg'
   ]
   ```
3. Images will automatically appear with proper sorting

### Supported Formats:
- `.jpg`, `.jpeg`, `.png`, `.webp`
- Recommended: Use `.jpg` for photos, `.png` for graphics

### Fallback System:
If no specific filename is listed, the system tries:
- `thumb.jpg`, `thumb.png`, `thumbnail.jpg`, etc.
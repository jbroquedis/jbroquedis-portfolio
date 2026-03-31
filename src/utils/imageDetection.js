// Image Detection Utility
// This file manages dynamic image detection for all projects

/**
 * Known thumbnail files for each project
 * Update this object when you add new images
 */
export const knownThumbnails = {
  // Architecture Projects - Updated with actual files from your folders
  'architecture-project-1': 'project1.png',
  'architecture-project-2': 'Enscape_2024-06-14-21-27-01.jpg',
  'architecture-project-3': 'Enscape_2024-06-12-19-51-48.jpg',
  'architecture-project-4': 'CP_R1b.jpg',
  'architecture-project-5': 'AC_LC R1.jpg',
  'architecture-project-6': 'AC_LS R2.jpg',
  'architecture-project-7': 'MCG_2_6.jpg',
  'architecture-project-8': 'MCG1_QUINCHO 2.jpg',
  'architecture-project-9': 'bg-Photoroom (1).png',
  'architecture-project-10': 'LP_3D_1.jpg',
  'architecture-project-11': 'project4.jpg',
  'architecture-project-12': 'MERCER_2.jpg',
  
  // Computational Design Projects (using actual thumbnail files)
  'computational-design-project-1': 'Screenshot 2025-05-27 192705.png',
  'computational-design-project-2': 'Screenshot 2025-03-24 182051_processed.png',
  'computational-design-project-3': 'Screenshot 2025-10-21 230253.png',
  'computational-design-project-4': '1.jpg',
  'computational-design-project-5': 'ac 2.jpg',
  'computational-design-project-6': 'overall.jpg',
  'computational-design-project-7': 'thinker in chair.jpg',
  'computational-design-project-8': 'Screenshot 2025-03-19 190936.png',
  'computational-design-project-10': 'Screenshot 2024-12-03 221516.png',
  
  // Experimental Projects
  'experimental-project-1': 'b1e2a4288d83_3.png',
  'experimental-project-2': 'bbd33487072f.png',
  'experimental-project-3': 'f6f41e6275a9.png',
  
  // Add more projects as you upload images
  // Format: 'project-key': 'filename.jpg'
}

/**
 * Known app-embedding files for computational design projects
 * Can be videos, images, GIFs, or folder names for web apps
 */
export const knownAppEmbeddings = {
  'computational-design-project-1': 'AS4_Joaquin_Marco_isOGen_1080 _final.mp4',
  'computational-design-project-2': 'bimsc25-datamgmt-final-project-dev', // folder
  'computational-design-project-3': 'CBDM_Final_Project_Joaquin_Broquedis.mp4',
  'computational-design-project-5': 'Screenshot 2025-10-21 154901.png',
  'computational-design-project-7': 'FINAL CHAIR WIREFRAME.gif',
  'computational-design-project-10': 'AS6-Filippo-Joaquin-Marco-EdenTower-Presentation.mp4',
  
  // Experimental Projects
  'experimental-project-1': '85fc3b1ac99c_2.png',
  'experimental-project-2': 'bbd33487072f.png',
  'experimental-project-3': 'bf7ca1d7298b.png',
}

/**
 * Known gallery images for each project
 * Images will be sorted numerically first, then alphabetically
 */
export const knownGalleryImages = {
  'architecture-project-1': [
    '3.jpg',
    '3D_GRAL_TRABAJO.jpg',
    '4.jpg'
  ],
  
  'architecture-project-2': [
    'Diseño sin título (5).jpg',
    'Diseño sin título (6).jpg',
    'Diseño sin título (7).jpg',
    'Diseño sin título (8).jpg',
    'Diseño sin título (9).jpg',
    'Enscape_2024-06-14-21-29-38.jpg',
    'Enscape_2024-06-14-21-31-54.jpg',
    'Enscape_2024-06-14-21-32-26.jpg'
  ],
  
  'architecture-project-3': [
    'Diseño sin título (1).png',
    'Diseño sin título (2).png',
    'Diseño sin título (3).png',
    'Diseño sin título (4).png',
    'Diseño sin título (5).png',
    'Diseño sin título (6).png',
    'Diseño sin título (7).png',
    'Diseño sin título.png'
  ],
  
  'architecture-project-4': [
    '1.jpg',
    '2.jpg',
    '3.jpg',
    '4.jpg',
    '5.jpg',
    '6.jpg',
    '7.jpg'
  ],
  
  'architecture-project-5': [
    '0.jpg',
    '1.jpg',
    '2.jpg',
    '3.jpg',
    '4.jpg',
    '5.jpg'
  ],
  
  'architecture-project-6': [
    '1.jpg',
    '2.jpg',
    '3.jpg',
    '4.jpg'
  ],
  
  'architecture-project-7': [
    'MCG_2_3.1.jpg',
    'MCG_2_4.jpg',
    'MCG_2_5.jpg',
    'MCG_2_8.jpg'
  ],
  
  'architecture-project-8': [
    'MCG1_COWORK 1.jpg',
    'MCG1_COWORK 3.jpg',
    'MCG1_COWORK 4.jpg',
    'MCG1_QUINCHO 1.jpg',
    'MCG1_QUINCHO 3.jpg'
  ],
  
  'architecture-project-9': [
    '1.png',
    '2.png',
    '3.png',
    '4.png',
    '5.png'
  ],
  
  'architecture-project-10': [
    'LP_3D_1.jpg',
    'LP_3D_2.jpg',
    'LP_3D_3.jpg',
    'LP_3D_CHIM_ESP.jpg',
    'LP_3D_CHIM_HIDD.jpg',
    'LP_3D_CHIM_REAL.jpg',
    'LP_3D_COC_ESP.jpg',
    'LP_3D_COC_HIDD.jpg',
    'LP_3D_COC_REAL.jpg'
  ],
  
  'architecture-project-11': [
    '1.jpg',
    '2.jpg',
    '4.jpg',
    '5.jpg'
  ],
  
  'architecture-project-12': [
    'MERCER_1.jpg',
    'MERCER_2.jpg',
    'MERCER_R1.jpg',
    'MERCER_R2.jpg',
    'MERCER_R3.jpg',
    'MERCER_R4.jpg'
  ],
  
  'computational-design-project-1': [
    'isogen_poster.gif',
    'poster gif 2.gif',
    'Screenshot 2025-05-27 192705.png',
    'Screenshot 2025-05-27 192842.png',
    'Screenshot 2025-06-13 102746.png',
    'Screenshot 2025-06-13 103107.png',
    'Screenshot 2025-06-13 103119.png',
    'Screenshot 2025-06-13 103942.png',
    'Screenshot 2025-06-13 105135.png',
    'Screenshot 2025-06-13 105310.png',
    'Screenshot 2025-06-13 105629.png',
    'Screenshot 2025-06-13 110100.png',
    'Screenshot 2025-06-13 110108.png'
  ],
  
  'computational-design-project-2': [
    'Screenshot 2025-03-24 170155_processed.png',
    'Screenshot 2025-03-24 175759_processed.png'
  ],
  
  'computational-design-project-3': [
    'Screenshot 2025-10-21 230326.png',
    'Screenshot 2025-10-21 230331.png',
    'Screenshot 2025-10-21 230352.png',
    'Screenshot 2025-10-21 230404.png'
  ],
  
  'computational-design-project-4': [
    'reyk.gif',
    'singapore 2.gif'
  ],
  
  'computational-design-project-5': [
    'ac.jpg',
    'ac 2.jpg',
    'ac 3.jpg',
    'ac 4.jpg',
    'ac5.jpg'
  ],
  
  'computational-design-project-6': [
    'sasdad.jpg',
    'shell 1.jpg',
    'shell 2.jpg',
    'shell 3.jpg',
    'shell 4.jpg',
    'shell 5.jpg',
    'shell 6.jpg',
    'shell 7.jpg',
    'shell 8.jpg'
  ],
  
  'computational-design-project-7': [
    'curves.gif',
    'thinker neo.gif',
    'TOPO OPT 1.gif'
  ],
  
  'computational-design-project-8': [
    'Screenshot 2025-03-19 125013.png',
    'Screenshot 2025-03-19 182425.png',
    'Screenshot 2025-03-19 182503.png',
    'Screenshot 2025-03-19 190357.png',
    'Screenshot 2025-03-19 190651.png',
    'Screenshot 2025-03-19 190747.png',
    'Screenshot 2025-03-19 190936.png'
  ],
  
  'experimental-project-1': [
    '3695c861f797_1.png',
    'b1e2a4288d83_3.png'
  ],
  
  'experimental-project-2': [
    '3ac7671e75f7.png',
    '8e00a703bfae.png',
    '9b4bb56b8f51.png',
    'afb22c9a5c6b.png'
  ],
  
  // Add gallery images for other projects as you upload them
  // Format: 'project-key': ['image1.jpg', 'image2.jpg', ...]
}

/**
 * Common thumbnail filename patterns to try as fallbacks
 */
export const commonThumbnailNames = [
  'thumb.jpg',
  'thumb.jpeg', 
  'thumb.png',
  'thumb.webp',
  'thumbnail.jpg',
  'thumbnail.jpeg',
  'thumbnail.png',
  'thumbnail.webp'
]

/**
 * Sort images with numeric priority, then alphabetical
 * @param {string[]} images - Array of image filenames
 * @returns {string[]} - Sorted array
 */
export function sortImages(images) {
  return [...images].sort((a, b) => {
    // Extract numbers from filenames for numeric sorting
    const getNumbers = (str) => {
      const matches = str.match(/\d+/g)
      return matches ? matches.map(Number) : []
    }
    
    const aNumbers = getNumbers(a)
    const bNumbers = getNumbers(b)
    
    // If both have numbers, compare numerically
    if (aNumbers.length > 0 && bNumbers.length > 0) {
      for (let i = 0; i < Math.max(aNumbers.length, bNumbers.length); i++) {
        const aNum = aNumbers[i] || 0
        const bNum = bNumbers[i] || 0
        if (aNum !== bNum) {
          return aNum - bNum
        }
      }
    }
    
    // Fallback to alphabetical sorting
    return a.toLowerCase().localeCompare(b.toLowerCase())
  })
}

/**
 * Get thumbnail filename for a project
 * @param {string} projectKey - Project identifier
 * @returns {string} - Thumbnail filename
 */
export function getThumbnailFilename(projectKey) {
  return knownThumbnails[projectKey] || commonThumbnailNames[0]
}

/**
 * Get sorted gallery images for a project
 * @param {string} projectKey - Project identifier
 * @returns {string[]} - Sorted array of image filenames
 */
export function getGalleryImages(projectKey) {
  const images = knownGalleryImages[projectKey] || []
  return sortImages(images)
}

/**
 * Simple auto-detect: check folder for files and return them
 * @param {string} projectKey - Project identifier
 * @param {string} folderType - 'gallery', 'thumbnail', 'app-embedding'
 * @param {string} category - 'architecture' or 'computational-design'
 * @returns {Promise<string[]>} - Array of discovered filenames
 */
export async function autoDetectFiles(projectKey, folderType = 'gallery', category = 'architecture') {
  // Simple approach: try common file patterns and return what exists
  const basePath = `/projects/${category}/${projectKey}/${folderType}/`
  const foundFiles = []
  
  // Define common extensions
  const imageExts = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg', 'bmp']
  const videoExts = ['mp4', 'webm', 'mov', 'avi']
  
  let extensions = folderType === 'app-embedding' ? [...imageExts, ...videoExts] : imageExts
  
  // Common patterns to try
  const patterns = [
    // Exact files from your folders
    'project1.png', 'Enscape_2024-06-12-19-51-48.jpg', 'Enscape_2024-06-14-21-27-01.jpg', 
    'CP_R1b.jpg', 'AC_LC R1.jpg', 'AC_LS R2.jpg', 'MCG_2_6.jpg', 'bg-Photoroom (1).png',
    'Screenshot 2025-05-27 192705.png', 'Screenshot 2025-03-24 182051_processed.png',
    'ac 2.jpg', 'overall.jpg', 'thinker in chair.jpg', 'Screenshot 2024-12-03 221516.png',
    
    // Experimental project patterns
    'b1e2a4288d83_3.png', 'bbd33487072f.png', 'f6f41e6275a9.png',
    '85fc3b1ac99c_2.png', 'bf7ca1d7298b.png', '3695c861f797_1.png',
    '3ac7671e75f7.png', '8e00a703bfae.png', '9b4bb56b8f51.png', 'afb22c9a5c6b.png',
    
    // Gallery patterns
    'dorm final.jpg', 'gral final.jpg', 'isogen_poster.gif', 'poster gif 2.gif',
    'reyk.gif', 'singapore 2.gif', 'curves.gif', 'thinker neo.gif',
    
    // Video patterns  
    'AS4_Joaquin_Marco_isOGen_1080 _final.mp4', 'CBDM_Final_Project_Joaquin_Broquedis.mp4',
    'FINAL CHAIR WIREFRAME.gif', 'AS6-Filippo-Joaquin-Marco-EdenTower-Presentation.mp4',
    
    // Generic patterns
    'thumb.jpg', 'thumbnail.jpg', 'main.jpg', 'cover.jpg', 'preview.jpg',
    '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'
  ]
  
  // Try each pattern
  for (const pattern of patterns) {
    try {
      const response = await fetch(`${basePath}${pattern}`, { method: 'HEAD' })
      if (response.ok) {
        foundFiles.push(pattern)
        console.log(`✅ Found: ${pattern}`)
        // For thumbnail, just return the first found file
        if (folderType === 'thumbnail') {
          return [pattern]
        }
      }
    } catch (e) {
      // Silent fail - file doesn't exist
    }
  }
  
  console.log(`📁 Auto-detected ${foundFiles.length} files in ${basePath}`)
  return sortImages(foundFiles)
}

/**
 * Alternative file detection when directory listing fails
 * @param {string} basePath - Base folder path
 * @param {string[]} allowedExtensions - Allowed file extensions
 * @param {string} projectKey - Project identifier
 * @param {string} folderType - Folder type
 * @returns {Promise<string[]>} - Array of discovered filenames
 */
async function tryAlternativeDetection(basePath, allowedExtensions, projectKey, folderType) {
  console.log(`🔄 Trying alternative detection for ${basePath}`)
  
  // Common file names to try
  const commonNames = [
    'thumb', 'thumbnail', 'main', 'cover', 'preview', 'image', 'photo',
    'video', 'movie', 'demo', 'app', 'index', 'main',
    'Screenshot', 'screenshot', 'Image', 'Video', 'Demo'
  ]
  
  const foundFiles = []
  
  // Try common extensions with common names
  for (const name of commonNames) {
    for (const ext of allowedExtensions) {
      const filename = `${name}.${ext.toLowerCase()}`
      try {
        const testResponse = await fetch(`${basePath}${filename}`)
        if (testResponse.ok) {
          foundFiles.push(filename)
          console.log(`✅ Alternative detection found: ${filename}`)
        }
      } catch (e) {
        // Silent fail for individual file tests
      }
    }
  }
  
  // Also try numbered files (1.jpg, 2.jpg, etc.)
  if (folderType === 'gallery') {
    for (let i = 1; i <= 10; i++) {
      for (const ext of ['jpg', 'jpeg', 'png', 'webp']) {
        const filename = `${i}.${ext}`
        try {
          const testResponse = await fetch(`${basePath}${filename}`)
          if (testResponse.ok) {
            foundFiles.push(filename)
            console.log(`✅ Alternative detection found: ${filename}`)
          }
        } catch (e) {
          // Silent fail
        }
      }
    }
  }
  
  return sortImages(foundFiles)
}

/**
 * Auto-detect images in project folders (backward compatibility)
 * @param {string} projectKey - Project identifier
 * @param {string} folderType - 'gallery' or 'thumbnail'
 * @returns {Promise<string[]>} - Array of discovered image filenames
 */
export async function autoDetectImages(projectKey, folderType = 'gallery') {
  return autoDetectFiles(projectKey, folderType, 'architecture')
}

/**
 * Get gallery images with auto-detection fallback
 * First tries known images, then auto-detects if none found
 * @param {string} projectKey - Project identifier
 * @returns {Promise<string[]>} - Sorted array of image filenames
 */
export async function getGalleryImagesAuto(projectKey) {
  // First try known images
  const knownImages = knownGalleryImages[projectKey]
  
  if (knownImages && knownImages.length > 0) {
    return sortImages(knownImages)
  }
  
  // If no known images, try auto-detection
  console.log(`Auto-detecting gallery images for ${projectKey}`)
  return await autoDetectImages(projectKey, 'gallery')
}

/**
 * Get thumbnail filename with simple auto-detection
 * @param {string} projectKey - Project identifier  
 * @param {string} category - 'architecture' or 'computational-design'
 * @returns {Promise<string>} - Thumbnail filename
 */
export async function getThumbnailFilenameAuto(projectKey, category = 'architecture') {
  console.log(`🖼️ Getting thumbnail for ${projectKey}`)
  
  // Try auto-detection first (simple check for any file in thumbnail folder)
  const detected = await autoDetectFiles(projectKey, 'thumbnail', category)
  
  if (detected.length > 0) {
    console.log(`✅ Auto-detected thumbnail: ${detected[0]}`)
    return detected[0]
  }
  
  // Fallback to known thumbnails
  const knownThumb = knownThumbnails[projectKey]
  if (knownThumb) {
    console.log(`📋 Using known thumbnail: ${knownThumb}`)
    return knownThumb
  }
  
  // Final fallback
  console.log(`⚠️ Using fallback thumbnail for ${projectKey}`)
  return 'thumb.jpg'
}

/**
 * Get gallery images for computational design projects
 * @param {string} projectKey - Project identifier
 * @returns {Promise<string[]>} - Sorted array of image filenames
 */
export async function getComputationalDesignGalleryImages(projectKey) {
  // First try known images
  const knownImages = knownGalleryImages[projectKey]
  
  if (knownImages && knownImages.length > 0) {
    return sortImages(knownImages)
  }
  
  // If no known images, try auto-detection
  console.log(`Auto-detecting gallery images for computational design ${projectKey}`)
  return await autoDetectFiles(projectKey, 'gallery', 'computational-design')
}

/**
 * Get app embedding filename for computational design projects (known files first)
 * @param {string} projectKey - Project identifier
 * @returns {string|null} - App embedding filename or null
 */
export function getAppEmbeddingFilename(projectKey) {
  const knownFile = knownAppEmbeddings[projectKey]
  if (knownFile) {
    console.log(`📋 Using known app embedding for ${projectKey}: ${knownFile}`)
    return knownFile
  }
  return null
}

/**
 * Get app embedding or video files for computational design projects (auto-detection)
 * @param {string} projectKey - Project identifier
 * @returns {Promise<string[]>} - Array of app/video filenames
 */
export async function getAppEmbeddingFiles(projectKey) {
  console.log(`🎬 Auto-detecting app embedding/video files for ${projectKey}`)
  const files = await autoDetectFiles(projectKey, 'app-embedding', 'computational-design')
  console.log(`🎬 Found ${files.length} app/video files for ${projectKey}:`, files)
  return files
}

/**
 * Get app embedding filename with auto-detection fallback
 * @param {string} projectKey - Project identifier
 * @returns {Promise<string|null>} - App embedding filename or null
 */
export async function getAppEmbeddingFilenameAuto(projectKey) {
  // First try known file
  const knownFile = getAppEmbeddingFilename(projectKey)
  if (knownFile) {
    return knownFile
  }
  
  // Determine category from project key
  const category = projectKey.startsWith('experimental-') ? 'experimental' : 'computational-design'
  
  // Try auto-detection
  console.log(`🔍 Auto-detecting app embedding for ${projectKey}`)
  const detected = await autoDetectFiles(projectKey, 'app-embedding', category)
  return detected.length > 0 ? detected[0] : null
}

/**
 * Get gallery images for experimental projects
 * @param {string} projectKey - Project identifier
 * @returns {Promise<string[]>} - Sorted array of image filenames
 */
export async function getExperimentalGalleryImages(projectKey) {
  // First try known images
  const knownImages = knownGalleryImages[projectKey]
  
  if (knownImages && knownImages.length > 0) {
    return sortImages(knownImages)
  }
  
  // If no known images, try auto-detection
  console.log(`Auto-detecting gallery images for experimental ${projectKey}`)
  return await autoDetectFiles(projectKey, 'gallery', 'experimental')
}

/**
 * Test function to check what files exist in a specific computational design project
 * @param {string} projectKey - Project identifier (e.g., 'computational-design-project-1')
 * @returns {Promise<Object>} - Object with detected files by folder type
 */
export async function testComputationalDesignProject(projectKey = 'computational-design-project-1') {
  console.log(`🧪 Testing file detection for ${projectKey}`)
  
  const results = {
    thumbnail: await autoDetectFiles(projectKey, 'thumbnail', 'computational-design'),
    gallery: await autoDetectFiles(projectKey, 'gallery', 'computational-design'), 
    appEmbedding: await autoDetectFiles(projectKey, 'app-embedding', 'computational-design')
  }
  
  console.log(`🧪 Test results for ${projectKey}:`, results)
  return results
}

/**
 * Manually refresh project images (force re-detection)
 * Call this function when you add new files to project folders
 * @param {string} projectKey - Project identifier to refresh (optional - refreshes all if not provided)
 */
export async function refreshProjectImages(projectKey = null) {
  console.log(`🔄 Manual refresh triggered for: ${projectKey || 'all projects'}`)
  
  if (projectKey) {
    // Refresh specific project
    try {
      // Force page reload to clear caches and re-detect files
      console.log(`🔄 Refreshing ${projectKey}... (page will reload)`)
      window.location.reload()
    } catch (error) {
      console.error(`❌ Error refreshing ${projectKey}:`, error)
    }
  } else {
    // Refresh all projects
    console.log('🔄 Refreshing all projects...')
    window.location.reload()
  }
}

/**
 * Check if a specific file exists in a project folder
 * @param {string} projectKey - Project identifier
 * @param {string} folderType - 'gallery', 'thumbnail', 'app-embedding'
 * @param {string} filename - Filename to check
 * @param {string} category - 'architecture' or 'computational-design'
 * @returns {Promise<boolean>} - True if file exists
 */
export async function checkFileExists(projectKey, folderType, filename, category) {
  const basePath = `/projects/${category}/${projectKey}/${folderType}/`
  const fullPath = `${basePath}${filename}`
  
  try {
    const response = await fetch(fullPath, { method: 'HEAD' })
    const exists = response.ok
    console.log(`🔍 File check: ${fullPath} - ${exists ? '✅ EXISTS' : '❌ NOT FOUND'}`)
    return exists
  } catch (error) {
    console.warn(`File check failed for ${fullPath}:`, error)
    return false
  }
}

/**
 * Development helper: Add files to known lists for immediate recognition
 * Use this when auto-detection fails but you know files exist
 */
export function addKnownFile(projectKey, fileType, filename) {
  if (fileType === 'thumbnail') {
    knownThumbnails[projectKey] = filename
    console.log(`✅ Added thumbnail for ${projectKey}: ${filename}`)
  } else if (fileType === 'gallery') {
    if (!knownGalleryImages[projectKey]) {
      knownGalleryImages[projectKey] = []
    }
    if (!knownGalleryImages[projectKey].includes(filename)) {
      knownGalleryImages[projectKey].push(filename)
      console.log(`✅ Added gallery image for ${projectKey}: ${filename}`)
    }
  } else if (fileType === 'app-embedding') {
    knownAppEmbeddings[projectKey] = filename
    console.log(`✅ Added app embedding for ${projectKey}: ${filename}`)
  }
  
  // Optionally trigger a page refresh to see changes immediately
  if (confirm(`File added to ${projectKey}. Refresh page to see changes?`)) {
    window.location.reload()
  }
}

// Expose helper functions to window for development use
if (import.meta.env.DEV) {
  window.portfolioDevTools = {
    refreshImages: refreshProjectImages,
    checkFile: checkFileExists,
    addKnownFile: addKnownFile,
    testProject: testComputationalDesignProject,
    
    // Quick helpers
    addThumb: (project, filename) => addKnownFile(project, 'thumbnail', filename),
    addGallery: (project, filename) => addKnownFile(project, 'gallery', filename),
    addApp: (project, filename) => addKnownFile(project, 'app-embedding', filename),
    
    // Example usage:
    help: () => {
      console.log(`
🔧 Portfolio Dev Tools:
  
To manually add files when auto-detection fails:
  portfolioDevTools.addThumb('computational-design-project-1', 'myimage.jpg')
  portfolioDevTools.addGallery('computational-design-project-1', 'myimage.jpg')
  portfolioDevTools.addApp('computational-design-project-1', 'myvideo.mp4')
  
To test file detection:
  portfolioDevTools.testProject('computational-design-project-1')
  
To refresh all images:
  portfolioDevTools.refreshImages()
  
To check if file exists:
  portfolioDevTools.checkFile('project-key', 'gallery', 'filename.jpg', 'computational-design')
      `)
    }
  }
  
  console.log('🔧 Portfolio dev tools loaded! Type portfolioDevTools.help() for usage.')
}
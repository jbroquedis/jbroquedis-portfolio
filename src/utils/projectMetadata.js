// Project Metadata Utility
// This file manages loading metadata from project-specific JSON files

/**
 * Load project metadata from JSON file
 * @param {string} projectKey - Project identifier (e.g., 'architecture-project-1')
 * @param {string} category - Project category ('architecture' or 'computational-design')
 * @returns {Promise<Object|null>} - Project metadata object or null
 */
export async function loadProjectMetadata(projectKey, category) {
  const metadataPath = `/projects/${category}/${projectKey}/metadata.json`
  
  try {
    const response = await fetch(metadataPath)
    if (!response.ok) {
      // Don't log warning for 404 - this is expected for projects without metadata.json
      return null
    }
    
    const metadata = await response.json()
    console.log(`✅ Loaded metadata for ${projectKey}:`, metadata)
    
    return metadata
    
  } catch (error) {
    // Only log actual errors, not 404s
    if (!error.message.includes('404')) {
      console.warn(`❌ Error loading metadata for ${projectKey}:`, error)
    }
    return null
  }
}

/**
 * Create default metadata structure for architecture projects
 * @param {Object} project - Base project data from projects.js
 * @returns {Object} - Default metadata structure
 */
export function createDefaultArchitectureMetadata(project) {
  return {
    name: project.name || 'Untitled Project',
    year: project.year || new Date().getFullYear(),
    issuedFor: 'Academic Project',
    programme: 'Mixed Use',
    area: 'TBD',
    collaboration: 'Individual Work',
    description: project.description || 'Project description not available.'
  }
}

/**
 * Create default metadata structure for computational design projects
 * @param {Object} project - Base project data from projects.js
 * @returns {Object} - Default metadata structure
 */
export function createDefaultComputationalMetadata(project) {
  return {
    name: project.name || 'Untitled Project',
    year: project.year || new Date().getFullYear(),
    issuedFor: 'Academic Project',
    techStack: 'Various Technologies',
    collaboration: 'Individual Work',
    textDescription: project.description || 'Project description not available.'
  }
}

/**
 * Get project metadata with fallback to defaults
 * @param {string} projectKey - Project identifier
 * @param {string} category - Project category
 * @param {Object} baseProject - Base project data from projects.js
 * @returns {Promise<Object>} - Complete metadata object
 */
export async function getProjectMetadata(projectKey, category, baseProject) {
  // Try to load from JSON file first
  const loadedMetadata = await loadProjectMetadata(projectKey, category)
  
  if (loadedMetadata) {
    return loadedMetadata
  }
  
  // Fallback to default structure with base project data
  if (category === 'architecture') {
    return createDefaultArchitectureMetadata(baseProject)
  } else if (category === 'computational-design') {
    return createDefaultComputationalMetadata(baseProject)
  }
  
  return {}
}

/**
 * Create sample metadata JSON files for projects (for development)
 * This function is for reference - shows the expected JSON structure
 */
export function getSampleMetadataStructures() {
  return {
    architecture: {
      name: "Residential Complex",
      year: 2024,
      issuedFor: "Urban Planning Commission",
      programme: "Residential Mixed-Use Development",
      area: "12,500 sqm",
      collaboration: "Team Project with John Doe, Jane Smith",
      description: "A sustainable residential complex featuring innovative green technologies and community spaces designed for modern urban living."
    },
    
    computationalDesign: {
      name: "Parametric Chair Design",
      year: 2024,
      issuedFor: "Design Technology Course",
      techStack: "Grasshopper, Rhino3D, Python, C#",
      collaboration: "Individual Work",
      textDescription: "An algorithmic approach to furniture design using parametric modeling and optimization techniques to create ergonomic seating solutions."
    }
  }
}
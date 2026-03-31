<template>
  <div class="architecture">
    <!-- Project Data Bar - Only show when project is selected -->
    <ProjectDataBar 
      v-if="selectedProject"
      :projectData="selectedProjectMetadata"
      category="architecture"
    />
    
    <!-- Main content - conditional display -->
    <div v-if="selectedProject" class="split-container">
      <!-- Left side: Interactive Speckle Model -->
            <div class="left-panel" :style="{ width: leftPanelWidth + 'px' }">
        <div class="panel-content">
          <!-- Speckle viewer with isometric default -->
          <div class="speckle-viewer">
            <div v-if="selectedSpeckleResource" class="speckle-iframe-container">
              <ProjectViewer :speckleResource="selectedSpeckleResource" />
            </div>
            <div v-else-if="selectedProjectData?.speckleUrl" class="speckle-iframe-container">
              <iframe 
                :src="ensureOrtho(selectedProjectData.speckleUrl)"
                width="100%"
                height="100%"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>
            <div v-else class="viewer-placeholder">
              <p>3D Model Viewer</p>
              <p>Select a project from bottom slider</p>
              <p v-if="selectedProjectData" class="file-path">
                Model path: {{ selectedProjectData.speckleModelPath }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Resizable divider -->
      <div class="divider glass-interactive" @mousedown="startResize">
        <div class="resize-handle">
          <span>⟷</span>
        </div>
      </div>

      <!-- Right side: Project Gallery (Expandable to screen middle) -->
      <div class="right-panel" :style="{ width: rightPanelWidth + 'px' }">
        <div class="panel-content">
          <!-- Vertical image scroller with infinite wrap -->
          <div 
            class="image-gallery" 
            ref="galleryRef"
            @scroll="handleGalleryScroll"
          >
            <template v-if="wrappedImages && wrappedImages.length > 0">
            <div 
              v-for="(image, index) in wrappedImages" 
              :key="`${image}-${index}`"
              class="image-item glass-interactive"
              @click="openLightbox(image)"
            >
              <img 
                :src="image" 
                :alt="`${selectedProjectData.title} - Image ${(index % validImages.length) + 1}`"
                @error="handleImageError(image)"
              />
            </div>
            </template>
            <!-- Show nothing if no valid images - gallery is simply empty -->
          </div>
        </div>
      </div>
    </div>
    
    <!-- Empty state when no project selected -->
    <div v-else class="empty-state">
      <div class="empty-content">
        <p class="empty-hint">{{ emptyHint }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { projects } from '../data/projects.js'
import { getThumbnailFilename, getGalleryImages, getThumbnailFilenameAuto, getGalleryImagesAuto } from '../utils/imageDetection.js'
import { getProjectMetadata } from '../utils/projectMetadata.js'
import ProjectDataBar from '../components/ProjectDataBar.vue'
import ProjectViewer from '../components/ProjectViewer.vue'
import { useLanguage } from '../composables/useLanguage.js'

export default {
  name: 'Architecture',
  components: {
    ProjectDataBar,
    ProjectViewer
  },
  setup() {
    const { t } = useLanguage()
    const rightPanelWidth = ref(300)
    const windowWidth = ref(window.innerWidth)
    const selectedProject = ref(null)
    const architectureProjects = ref([])
    const selectedProjectMetadata = ref(null)
    const brokenImages = ref(new Set()) // Track images that failed to load
    const galleryRef = ref(null)
    const isAdjustingScroll = ref(false)
    let isResizing = false

    // Handle image load errors - remove from display
    const handleImageError = (imageSrc) => {
      brokenImages.value.add(imageSrc)
      // Force reactivity update
      brokenImages.value = new Set(brokenImages.value)
    }

    // Load projects with auto-detection
    const loadArchitectureProjects = async () => {
      const projectEntries = Object.entries(projects)
        .filter(([key, project]) => project.category === 'architecture')
      
      const projectsWithImages = await Promise.all(
        projectEntries.map(async ([key, project]) => {
          try {
            // Auto-detect gallery images and thumbnail
            const [galleryFiles, thumbnailFile] = await Promise.all([
              getGalleryImagesAuto(key),
              getThumbnailFilenameAuto(key, 'architecture')
            ])
            
            const galleryImages = galleryFiles.map(filename => `${project.galleryPath}${filename}`)

            // Add cache-busting timestamp for development (more aggressive)
            const cacheBuster = import.meta.env.DEV ? `?t=${Date.now()}&r=${Math.random()}` : ''
            
            return {
              id: key,
              title: project.name,
              year: project.year,
              description: project.description,
              thumbnail: `${project.thumbnailPath}${thumbnailFile}${cacheBuster}`,
              speckleUrl: project.speckleResource?.embedUrl || null,
              speckleModelPath: project.speckleModelPath,
              images: galleryImages.map(img => `${img}${cacheBuster}`)
            }
          } catch (error) {
            console.warn(`Error loading project ${key}:`, error)
            // Fallback to original method
            const imageFiles = getGalleryImages(key)
            const galleryImages = imageFiles.map(filename => `${project.galleryPath}${filename}`)
            
            return {
              id: key,
              title: project.name,
              year: project.year,
              description: project.description,
              thumbnail: `${project.thumbnailPath}${getThumbnailFilename(key)}`,
              speckleUrl: project.speckleResource?.embedUrl || null,
              speckleModelPath: project.speckleModelPath,
              images: galleryImages
            }
          }
        })
      )
      
      architectureProjects.value = projectsWithImages
    }

    // Selected project data
    const selectedProjectData = computed(() => {
      return architectureProjects.value.find(p => p.id === selectedProject.value)
    })

    // Valid images - filter out any that failed to load
    const validImages = computed(() => {
      if (!selectedProjectData.value?.images) return []
      return selectedProjectData.value.images.filter(img => !brokenImages.value.has(img))
    })

    // Wrapped images for infinite scroll - triple the images
    const wrappedImages = computed(() => {
      if (validImages.value.length === 0) return []
      return [...validImages.value, ...validImages.value, ...validImages.value]
    })

    // Handle gallery scroll for infinite wrapping
    const handleGalleryScroll = () => {
      if (isAdjustingScroll.value || validImages.value.length === 0) return
      
      const gallery = galleryRef.value
      if (!gallery) return
      
      const scrollTop = gallery.scrollTop
      const scrollHeight = gallery.scrollHeight
      const clientHeight = gallery.clientHeight
      
      // Calculate the height of one set of images (1/3 of total)
      const oneSetHeight = scrollHeight / 3
      
      // If scrolled past 2/3, jump back to 1/3
      if (scrollTop >= oneSetHeight * 2 - clientHeight / 2) {
        isAdjustingScroll.value = true
        gallery.scrollTop = scrollTop - oneSetHeight
        requestAnimationFrame(() => {
          isAdjustingScroll.value = false
        })
      }
      // If scrolled before 1/3, jump to 2/3
      else if (scrollTop <= oneSetHeight * 0.5) {
        isAdjustingScroll.value = true
        gallery.scrollTop = scrollTop + oneSetHeight
        requestAnimationFrame(() => {
          isAdjustingScroll.value = false
        })
      }
    }

    // Initialize gallery scroll position to middle set
    const initGalleryScroll = () => {
      if (!galleryRef.value || validImages.value.length === 0) return
      
      setTimeout(() => {
        const gallery = galleryRef.value
        if (gallery) {
          const oneSetHeight = gallery.scrollHeight / 3
          gallery.scrollTop = oneSetHeight
        }
      }, 100)
    }

    // Calculate maximum width (middle of screen)
    const maxPanelWidth = computed(() => {
      return Math.floor(windowWidth.value / 2)
    })

    // Left panel width follows remaining space
    const leftPanelWidth = computed(() => {
      return Math.max(0, windowWidth.value - rightPanelWidth.value)
    })

    // Prefer speckleResource from base projects data (gives stream/model ids)
    const selectedSpeckleResource = computed(() => {
      const id = selectedProject.value
      return id ? (projects[id]?.speckleResource || null) : null
    })

    // Load metadata for selected project
    const loadSelectedProjectMetadata = async (projectId) => {
      if (!projectId) {
        selectedProjectMetadata.value = null
        return
      }
      
      try {
        const baseProject = projects[projectId]
        if (baseProject) {
          const metadata = await getProjectMetadata(projectId, 'architecture', baseProject)
          selectedProjectMetadata.value = metadata
        } else {
          console.warn(`Project ${projectId} not found in projects data`)
          selectedProjectMetadata.value = null
        }
      } catch (error) {
        console.error(`Error loading metadata for ${projectId}:`, error)
        selectedProjectMetadata.value = null
      }
    }

    // Listen to project selection from bottom slider
    // This will be triggered by the ProjectSlider component
    const handleProjectSelection = async (projectId) => {
      // Only update if it's an architecture project
      const project = projects[projectId]
      if (project && project.category === 'architecture') {
        // Clear broken images tracking when switching projects
        brokenImages.value = new Set()
        selectedProject.value = projectId
        await loadSelectedProjectMetadata(projectId)
        // Initialize gallery scroll after images load
        setTimeout(initGalleryScroll, 200)
      }
    }

    const startResize = (e) => {
      isResizing = true
      document.addEventListener('mousemove', onResize)
      document.addEventListener('mouseup', stopResize)
      e.preventDefault()
    }

    const onResize = (e) => {
      if (!isResizing) return
      const newWidth = windowWidth.value - e.clientX
      const minWidth = 200
      const maxWidth = maxPanelWidth.value
      
      // Constrain width between minimum and maximum (screen middle)
      rightPanelWidth.value = Math.max(minWidth, Math.min(maxWidth, newWidth))
    }

    const stopResize = () => {
      isResizing = false
      document.removeEventListener('mousemove', onResize)
      document.removeEventListener('mouseup', stopResize)
    }

    const updateWindowWidth = () => {
      windowWidth.value = window.innerWidth
      // Ensure panel width doesn't exceed new maximum
      if (rightPanelWidth.value > maxPanelWidth.value) {
        rightPanelWidth.value = maxPanelWidth.value
      }
    }

    const openLightbox = (imageSrc) => {
      // TODO: implement full lightbox
      window.open(imageSrc, '_blank', 'noopener')
    }

    // Ensure orthographic by editing/adding Speckle #embed JSON
    const ensureOrtho = (url) => {
      if (!url) return url
      
      // Split URL from hash
      const hashIndex = url.indexOf('#')
      const base = hashIndex >= 0 ? url.substring(0, hashIndex) : url
      const existingHash = hashIndex >= 0 ? url.substring(hashIndex + 1) : ''
      
      // Parse existing embed settings if present
      let embedObj = { isEnabled: true }
      if (existingHash.startsWith('embed=')) {
        try {
          embedObj = JSON.parse(decodeURIComponent(existingHash.replace(/^embed=/, '')))
        } catch { embedObj = { isEnabled: true } }
      }
      
      // Force orthographic projection via the ui.camera.isOrthoProjection path
      // This matches Speckle's serialization format
      embedObj.isEnabled = true
      if (!embedObj.ui) embedObj.ui = {}
      if (!embedObj.ui.camera) embedObj.ui.camera = {}
      embedObj.ui.camera.isOrthoProjection = true
      
      // Also set top-level flags in case they help
      embedObj.isOrthoProjection = true
      
      const newHash = 'embed=' + encodeURIComponent(JSON.stringify(embedObj))
      return `${base}#${newHash}`
    }

    onMounted(async () => {
      window.addEventListener('resize', updateWindowWidth)
      // Set initial gallery width to 1/3 of screen (capped by constraints)
      const desired = Math.floor(windowWidth.value / 3)
      const minWidth = 200
      rightPanelWidth.value = Math.max(minWidth, Math.min(maxPanelWidth.value, desired))
      
      // Load architecture projects with auto-detection
      await loadArchitectureProjects()
      
      // No auto-selection - wait for user to select a project

      // Listen for global project selection events
      window.addEventListener('projectSelected', (event) => {
        handleProjectSelection(event.detail.projectId)
      })


    })

    return {
      rightPanelWidth,
      leftPanelWidth,
      selectedProject,
      selectedProjectData,
      selectedProjectMetadata,
      selectedSpeckleResource,
      architectureProjects,
      validImages,
      wrappedImages,
      galleryRef,
      handleImageError,
      handleGalleryScroll,
      startResize,
      openLightbox,
      ensureOrtho,
      emptyHint: computed(() => t('empty_hint'))
    }
  }
}
</script>

<style scoped>
.architecture {
  height: 100vh;
  overflow: hidden;
  background: #ffffff;
  padding-top: 0; /* No padding - body already has padding-top:80px for TopBar */
}

.split-container {
  display: flex;
  position: fixed; /* Anchor main bar to viewport below data bar */
  top: 130px; /* Top bar (80px) + data bar (50px) */
  left: 0;
  right: 0;
  bottom: var(--slider-height, 120px); /* Leave space for bottom project bar */
  width: 100%;
  overflow: hidden;
  margin-top: 0;
}

.empty-state {
  height: calc(100vh - 80px - var(--slider-height, 120px));
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
}

.empty-hint {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  color: var(--text-secondary);
  letter-spacing: 0.1em;
  opacity: 0.5;
}

.left-panel {
  flex: 1;
  background: #ffffff;
  border: none;
  height: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0;
}

.divider {
  width: 0; /* Hide the divider completely - no white stripe */
  cursor: col-resize;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s ease;
  background: transparent;
  border: none;
}

.divider:hover {
  width: 16px;
  background: #f9f9f9;
  border-left: 1px solid #e5e7eb;
  border-right: 1px solid #e5e7eb;
}

.resize-handle {
  color: var(--text-primary);
  font-weight: bold;
  font-size: 16px;
  transform: rotate(90deg);
  user-select: none;
  transition: all 0.3s ease;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.divider:hover .resize-handle {
  color: var(--hover-orange);
  font-size: 18px;
}

.right-panel {
  border: none;
  overflow: hidden;
  background: #ffffff;
}

.panel-content {
  padding: 0.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.section-title h2 {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0.2rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.speckle-viewer {
  flex: 1;
  margin-top: 0;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  background: #ffffff;
  border: none;
}

.speckle-iframe-container {
  width: 100%;
  height: 100%;
  border-radius: 0;
  overflow: hidden;
}

.speckle-iframe-container iframe {
  border-radius: 0;
}

.viewer-placeholder {
  text-align: center;
  color: var(--text-primary);
  font-size: 1.2rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.file-path {
  font-family: monospace;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  color: var(--text-secondary);
  opacity: 0.7;
}

.image-gallery {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0;
  background: #ffffff;
}

.image-item {
  border-radius: 0;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
  background: #ffffff;
}

.image-item:hover {
  transform: none;
  box-shadow: none;
}

.image-item img {
  width: 100%;
  height: auto;
  display: block;
  transition: all 0.3s ease;
  border-radius: 0;
}

.image-item:hover img {
  filter: brightness(1.05);
}

.no-images-placeholder {
  text-align: center;
  padding: 2rem;
  color: var(--text-secondary);
  font-style: italic;
  background: #ffffff;
}

/* Hidden scrollbar for seamless scrolling */
.image-gallery::-webkit-scrollbar {
  width: 0;
  display: none;
}

.image-gallery {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

/* Responsive design */
@media (max-width: 768px) {
  .split-container {
    flex-direction: column;
  }
  
  .left-panel {
    height: 40vh;
  }
  
  .right-panel {
    width: 100% !important;
    height: 60vh;
  }
  
  .divider {
    display: none;
  }
}
</style>
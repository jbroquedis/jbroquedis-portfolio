<template>
  <div class="experimental">
    <!-- Project Data Bar - Only show when project is selected -->
    <ProjectDataBar 
      v-if="selectedProject"
      :projectData="selectedProjectMetadata"
      category="experimental"
    />
    
    <!-- Main content - conditional display -->
    <div v-if="selectedProject" class="split-container">
      <!-- Left side: Interactive App/Video Viewer -->
      <div class="left-panel" :style="{ width: leftPanelWidth + 'px' }">
        <div class="panel-content">
          <!-- App/Video viewer -->
          <div class="media-viewer">
            <!-- Web App (iframe) -->
            <div v-if="selectedProjectData?.mediaType === 'app'" class="app-iframe-container">
              <iframe 
                :src="selectedProjectData.mediaUrl"
                width="100%"
                height="100%"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>
            <!-- Video -->
            <div v-else-if="selectedProjectData?.mediaType === 'video'" class="video-container">
              <video 
                :src="selectedProjectData.mediaUrl"
                controls
                class="project-media"
                width="100%"
                height="100%"
              ></video>
            </div>
            <!-- Image/GIF -->
            <div v-else-if="selectedProjectData?.mediaType === 'image'" class="image-container">
              <img 
                :src="selectedProjectData.mediaUrl"
                :alt="`${selectedProjectData.title} - Interactive Media`"
                class="project-media"
              />
            </div>
            <!-- Placeholder -->
            <div v-else class="viewer-placeholder">
              <!-- Clean empty state - no instruction text -->
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
              <img :src="image" :alt="`${selectedProjectData.title} - Image ${(index % (selectedProjectData?.images?.length || 1)) + 1}`" />
            </div>
            </template>
            <!-- Empty state - no placeholder needed -->
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
import { getThumbnailFilename, getGalleryImages, getThumbnailFilenameAuto, getGalleryImagesAuto, getAppEmbeddingFilename, getAppEmbeddingFilenameAuto } from '../utils/imageDetection.js'
import { getProjectMetadata } from '../utils/projectMetadata.js'
import ProjectDataBar from '../components/ProjectDataBar.vue'
import { useLanguage } from '../composables/useLanguage.js'

export default {
  name: 'Experimental',
  components: {
    ProjectDataBar
  },
  setup() {
    const { t } = useLanguage()
    const rightPanelWidth = ref(300)
    const windowWidth = ref(window.innerWidth)
    const selectedProject = ref(null)
    const galleryRef = ref(null)
    const isAdjustingScroll = ref(false)
    const experimentalProjects = ref([])
    const selectedProjectMetadata = ref(null)
    let isResizing = false

    // Load projects with auto-detection
    const loadExperimentalProjects = async () => {
      const projectEntries = Object.entries(projects)
        .filter(([key, project]) => project.category === 'experimental')
      
      const projectsWithImages = await Promise.all(
        projectEntries.map(async ([key, project]) => {
          try {
            // Auto-detect gallery images, thumbnail, and app-embedding files
            const [galleryFiles, thumbnailFile, appEmbeddingFile] = await Promise.all([
              getGalleryImagesAuto(key),
              getThumbnailFilenameAuto(key, 'experimental'),
              getAppEmbeddingFilenameAuto(key)
            ])
            
            console.log(`🔧 Project ${key}:`)
            console.log(`  Thumbnail: ${thumbnailFile}`)
            console.log(`  App embedding: ${appEmbeddingFile}`)
            console.log(`  Gallery files: ${galleryFiles.length} found`)
            
            const galleryImages = galleryFiles.map(filename => `${project.galleryPath}${filename}`)

            // Add cache-busting timestamp for development (more aggressive)
            const cacheBuster = import.meta.env.DEV ? `?t=${Date.now()}&r=${Math.random()}` : ''
            
            // Determine media type and URL for app embedding
            let mediaUrl = null
            let mediaType = null
            
            if (appEmbeddingFile) {
              mediaUrl = `${project.appEmbeddingPath}${appEmbeddingFile}${cacheBuster}`
              const extension = appEmbeddingFile.split('.').pop()?.toLowerCase()
              
              if (['mp4', 'avi', 'mov', 'webm'].includes(extension)) {
                mediaType = 'video'
              } else if (['gif', 'jpg', 'jpeg', 'png', 'webp'].includes(extension)) {
                mediaType = 'image'
              } else {
                // Assume it's a folder containing a web app
                mediaType = 'app'
                mediaUrl = `${project.appEmbeddingPath}${appEmbeddingFile}/index.html${cacheBuster}`
              }
            }
            
            return {
              id: key,
              title: project.name,
              year: project.year,
              description: project.description,
              thumbnail: `${project.thumbnailPath}${thumbnailFile}${cacheBuster}`,
              mediaUrl: mediaUrl,
              mediaType: mediaType,
              appEmbeddingFile: appEmbeddingFile,
              appEmbeddingPath: project.appEmbeddingPath,
              images: galleryImages.map(img => `${img}${cacheBuster}`)
            }
          } catch (error) {
            console.warn(`Error loading project ${key}:`, error)
            // Fallback to original method
            const imageFiles = getGalleryImages(key)
            const galleryImages = imageFiles.map(filename => `${project.galleryPath}${filename}`)
            const appEmbeddingFile = getAppEmbeddingFilename(key)
            
            let mediaUrl = null
            let mediaType = null
            
            if (appEmbeddingFile) {
              mediaUrl = `${project.appEmbeddingPath}${appEmbeddingFile}`
              const extension = appEmbeddingFile.split('.').pop()?.toLowerCase()
              
              if (['mp4', 'avi', 'mov', 'webm'].includes(extension)) {
                mediaType = 'video'
              } else if (['gif', 'jpg', 'jpeg', 'png', 'webp'].includes(extension)) {
                mediaType = 'image'
              } else {
                mediaType = 'app'
                mediaUrl = `${project.appEmbeddingPath}${appEmbeddingFile}/index.html`
              }
            }
            
            return {
              id: key,
              title: project.name,
              year: project.year,
              description: project.description,
              thumbnail: `${project.thumbnailPath}${getThumbnailFilename(key)}`,
              mediaUrl: mediaUrl,
              mediaType: mediaType,
              appEmbeddingFile: appEmbeddingFile,
              appEmbeddingPath: project.appEmbeddingPath,
              images: galleryImages
            }
          }
        })
      )
      
      experimentalProjects.value = projectsWithImages
    }

    // Selected project data
    const selectedProjectData = computed(() => {
      return experimentalProjects.value.find(p => p.id === selectedProject.value)
    })

    // Wrapped images for infinite scroll - triple the images
    const wrappedImages = computed(() => {
      if (!selectedProjectData.value?.images || selectedProjectData.value.images.length === 0) return []
      return [...selectedProjectData.value.images, ...selectedProjectData.value.images, ...selectedProjectData.value.images]
    })

    // Handle gallery scroll for infinite wrapping
    const handleGalleryScroll = () => {
      if (isAdjustingScroll.value || !selectedProjectData.value?.images?.length) return
      
      const gallery = galleryRef.value
      if (!gallery) return
      
      const scrollTop = gallery.scrollTop
      const scrollHeight = gallery.scrollHeight
      const clientHeight = gallery.clientHeight
      const oneSetHeight = scrollHeight / 3
      
      if (scrollTop >= oneSetHeight * 2 - clientHeight / 2) {
        isAdjustingScroll.value = true
        gallery.scrollTop = scrollTop - oneSetHeight
        requestAnimationFrame(() => { isAdjustingScroll.value = false })
      } else if (scrollTop <= oneSetHeight * 0.5) {
        isAdjustingScroll.value = true
        gallery.scrollTop = scrollTop + oneSetHeight
        requestAnimationFrame(() => { isAdjustingScroll.value = false })
      }
    }

    // Initialize gallery scroll position
    const initGalleryScroll = () => {
      setTimeout(() => {
        if (galleryRef.value) {
          galleryRef.value.scrollTop = galleryRef.value.scrollHeight / 3
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

    // Load metadata for selected project
    const loadSelectedProjectMetadata = async (projectId) => {
      if (!projectId) {
        selectedProjectMetadata.value = null
        return
      }
      
      try {
        const baseProject = projects[projectId]
        if (baseProject) {
          const metadata = await getProjectMetadata(projectId, 'experimental', baseProject)
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
    const handleProjectSelection = async (projectId) => {
      // Only update if it's an experimental project
      const project = projects[projectId]
      if (project && project.category === 'experimental') {
        selectedProject.value = projectId
        await loadSelectedProjectMetadata(projectId)
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
      // Implement lightbox functionality
      console.log('Opening lightbox for:', imageSrc)
    }

    onMounted(async () => {
      window.addEventListener('resize', updateWindowWidth)
      // Set initial gallery width to 1/3 of screen (capped by constraints)
      const desired = Math.floor(windowWidth.value / 3)
      const minWidth = 200
      rightPanelWidth.value = Math.max(minWidth, Math.min(maxPanelWidth.value, desired))
      
      // Load experimental projects with auto-detection
      await loadExperimentalProjects()
      
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
      experimentalProjects,
      wrappedImages,
      galleryRef,
      handleGalleryScroll,
      startResize,
      openLightbox,
      emptyHint: computed(() => t('empty_hint'))
    }
  }
}
</script>

<style scoped>
.experimental {
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
  background: white;
  margin-top: 0;
}

.empty-state {
  height: calc(100vh - 146px - var(--slider-height, 120px));
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  margin-top: 146px;
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
  border: 1px solid #e5e7eb;
  border-left: none;
  border-top: none;
  overflow: hidden;
  background: white;
  padding: 0;
  margin: 0;
}

.panel-content {
  padding: 0 2rem 2rem 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;
}

.media-viewer {
  flex: 1;
  margin: 0;
  padding: 0;
  border-radius: 0 0 12px 12px; /* Only bottom corners rounded */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-top: none; /* No top border - flush with project data bar */
}

.app-iframe-container, .video-container, .image-container {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-iframe-container iframe {
  border-radius: 12px;
}

.project-media {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 12px;
}

.video-container .project-media {
  width: 100%;
  height: 100%;
  background: #000;
}

.image-container .project-media {
  display: block;
  transition: all 0.3s ease;
}

.image-container:hover .project-media {
  transform: scale(1.02);
}

.viewer-placeholder {
  text-align: center;
  color: var(--text-primary);
  font-size: 1.2rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.file-path, .file-info {
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
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.image-gallery::-webkit-scrollbar {
  width: 0;
  display: none;
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

/* Responsive design */
@media (max-width: 768px) {
  .split-container {
    flex-direction: column;
  }
  
  .left-panel {
    height: 40vh;

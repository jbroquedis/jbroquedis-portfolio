<template>
  <div class="data-mgmt">
    <ProjectDataBar
      v-if="selectedProject"
      :projectData="selectedProjectMetadata"
      category="data-management"
    />

    <div v-if="selectedProject" class="split-container">
      <!-- Left: media viewer -->
      <div class="left-panel" :style="{ width: leftPanelWidth + 'px' }">
        <div class="panel-content">
          <div class="media-viewer">
            <div v-if="selectedProjectData?.mediaType === 'app'" class="app-iframe-container">
              <iframe
                :src="selectedProjectData.mediaUrl"
                width="100%"
                height="100%"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>
            <div v-else-if="selectedProjectData?.mediaType === 'video'" class="video-container">
              <video
                :src="selectedProjectData.mediaUrl"
                controls
                class="project-media"
                width="100%"
                height="100%"
              ></video>
            </div>
            <div v-else-if="selectedProjectData?.mediaType === 'image'" class="image-container">
              <img
                :src="selectedProjectData.mediaUrl"
                :alt="`${selectedProjectData.title} - Media`"
                class="project-media"
              />
            </div>
            <div v-else class="viewer-placeholder"></div>
          </div>
        </div>
      </div>

      <!-- Resizable divider -->
      <div class="divider glass-interactive" @mousedown="startResize">
        <div class="resize-handle"><span>⟷</span></div>
      </div>

      <!-- Right: image gallery -->
      <div class="right-panel" :style="{ width: rightPanelWidth + 'px' }">
        <div class="panel-content">
          <div class="image-gallery" ref="galleryRef" @scroll="handleGalleryScroll">
            <template v-if="wrappedImages && wrappedImages.length > 0">
              <div
                v-for="(image, index) in wrappedImages"
                :key="`${image}-${index}`"
                class="image-item glass-interactive"
                @click="openLightbox(image)"
              >
                <img
                  :src="image"
                  :alt="`${selectedProjectData.title} - Image ${(index % (selectedProjectData?.images?.length || 1)) + 1}`"
                />
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="empty-state">
      <div class="empty-content">
        <p class="empty-hint">← select a project below</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { projects } from '../data/projects.js'
import {
  getThumbnailFilename,
  getGalleryImages,
  getThumbnailFilenameAuto,
  getGalleryImagesAuto,
  getAppEmbeddingFilename,
  getAppEmbeddingFilenameAuto
} from '../utils/imageDetection.js'
import { getProjectMetadata } from '../utils/projectMetadata.js'
import ProjectDataBar from '../components/ProjectDataBar.vue'

export default {
  name: 'DataMgmt',
  components: { ProjectDataBar },
  setup() {
    const rightPanelWidth = ref(300)
    const windowWidth = ref(window.innerWidth)
    const selectedProject = ref(null)
    const galleryRef = ref(null)
    const isAdjustingScroll = ref(false)
    const dataMgmtProjects = ref([])
    const selectedProjectMetadata = ref(null)
    let isResizing = false

    const loadProjects = async () => {
      const projectEntries = Object.entries(projects)
        .filter(([, project]) => project.category === 'data-management')

      const projectsWithImages = await Promise.all(
        projectEntries.map(async ([key, project]) => {
          try {
            const [galleryFiles, thumbnailFile, appEmbeddingFile] = await Promise.all([
              getGalleryImagesAuto(key),
              getThumbnailFilenameAuto(key, 'data-management'),
              getAppEmbeddingFilenameAuto(key)
            ])

            const galleryImages = galleryFiles.map(filename => `${project.galleryPath}${filename}`)
            const cacheBuster = import.meta.env.DEV ? `?t=${Date.now()}&r=${Math.random()}` : ''

            let mediaUrl = null
            let mediaType = null

            if (appEmbeddingFile) {
              mediaUrl = `${project.appEmbeddingPath}${appEmbeddingFile}${cacheBuster}`
              const ext = appEmbeddingFile.split('.').pop()?.toLowerCase()
              if (['mp4', 'avi', 'mov', 'webm'].includes(ext)) {
                mediaType = 'video'
              } else if (['gif', 'jpg', 'jpeg', 'png', 'webp'].includes(ext)) {
                mediaType = 'image'
              } else {
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
              mediaUrl,
              mediaType,
              appEmbeddingFile,
              appEmbeddingPath: project.appEmbeddingPath,
              images: galleryImages.map(img => `${img}${cacheBuster}`)
            }
          } catch {
            const imageFiles = getGalleryImages(key)
            const galleryImages = imageFiles.map(filename => `${project.galleryPath}${filename}`)
            const embeddingFile = getAppEmbeddingFilename(key)
            let mediaUrl = null, mediaType = null
            if (embeddingFile) {
              const ext = embeddingFile.split('.').pop()?.toLowerCase()
              if (['mp4', 'avi', 'mov', 'webm'].includes(ext)) { mediaType = 'video'; mediaUrl = `${project.appEmbeddingPath}${embeddingFile}` }
              else if (['gif', 'jpg', 'jpeg', 'png', 'webp'].includes(ext)) { mediaType = 'image'; mediaUrl = `${project.appEmbeddingPath}${embeddingFile}` }
              else { mediaType = 'app'; mediaUrl = `${project.appEmbeddingPath}${embeddingFile}/index.html` }
            }
            return {
              id: key,
              title: project.name,
              year: project.year,
              description: project.description,
              thumbnail: `${project.thumbnailPath}${getThumbnailFilename(key)}`,
              mediaUrl, mediaType, appEmbeddingFile: embeddingFile,
              appEmbeddingPath: project.appEmbeddingPath,
              images: galleryImages
            }
          }
        })
      )

      dataMgmtProjects.value = projectsWithImages
    }

    const selectedProjectData = computed(() =>
      dataMgmtProjects.value.find(p => p.id === selectedProject.value)
    )

    const wrappedImages = computed(() => {
      const imgs = selectedProjectData.value?.images
      if (!imgs || imgs.length === 0) return []
      return [...imgs, ...imgs, ...imgs]
    })

    const handleGalleryScroll = () => {
      if (isAdjustingScroll.value || !selectedProjectData.value?.images?.length) return
      const gallery = galleryRef.value
      if (!gallery) return
      const { scrollTop, scrollHeight, clientHeight } = gallery
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

    const initGalleryScroll = () => {
      setTimeout(() => {
        if (galleryRef.value) galleryRef.value.scrollTop = galleryRef.value.scrollHeight / 3
      }, 100)
    }

    const maxPanelWidth = computed(() => Math.floor(windowWidth.value / 2))
    const leftPanelWidth = computed(() => Math.max(0, windowWidth.value - rightPanelWidth.value))

    const loadMetadata = async (projectId) => {
      if (!projectId) { selectedProjectMetadata.value = null; return }
      try {
        const base = projects[projectId]
        if (base) selectedProjectMetadata.value = await getProjectMetadata(projectId, 'data-management', base)
        else selectedProjectMetadata.value = null
      } catch { selectedProjectMetadata.value = null }
    }

    const handleProjectSelection = async (projectId) => {
      const project = projects[projectId]
      if (project && project.category === 'data-management') {
        selectedProject.value = projectId
        await loadMetadata(projectId)
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
      rightPanelWidth.value = Math.max(200, Math.min(maxPanelWidth.value, windowWidth.value - e.clientX))
    }
    const stopResize = () => {
      isResizing = false
      document.removeEventListener('mousemove', onResize)
      document.removeEventListener('mouseup', stopResize)
    }

    const updateWindowWidth = () => {
      windowWidth.value = window.innerWidth
      if (rightPanelWidth.value > maxPanelWidth.value) rightPanelWidth.value = maxPanelWidth.value
    }

    const openLightbox = (imageSrc) => { window.open(imageSrc, '_blank', 'noopener') }

    const onProjectSelected = (e) => handleProjectSelection(e.detail.projectId)

    onMounted(async () => {
      window.addEventListener('resize', updateWindowWidth)
      const desired = Math.floor(windowWidth.value / 3)
      rightPanelWidth.value = Math.max(200, Math.min(maxPanelWidth.value, desired))
      await loadProjects()
      window.addEventListener('projectSelected', onProjectSelected)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', updateWindowWidth)
      window.removeEventListener('projectSelected', onProjectSelected)
    })

    return {
      rightPanelWidth,
      leftPanelWidth,
      selectedProject,
      selectedProjectData,
      selectedProjectMetadata,
      dataMgmtProjects,
      wrappedImages,
      galleryRef,
      handleGalleryScroll,
      startResize,
      openLightbox
    }
  }
}
</script>

<style scoped>
.data-mgmt {
  height: 100vh;
  overflow: hidden;
  background: #ffffff;
}

.split-container {
  display: flex;
  position: fixed;
  top: 130px;
  left: 0;
  right: 0;
  bottom: var(--slider-height, 120px);
  width: 100%;
  overflow: hidden;
  background: white;
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
  height: 100%;
  overflow: hidden;
}

.divider {
  width: 0;
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
  color: var(--cat-data);
  font-weight: bold;
  font-size: 16px;
  transform: rotate(90deg);
  user-select: none;
  transition: color 0.3s ease;
}

.right-panel {
  border: 1px solid #e5e7eb;
  border-left: none;
  border-top: none;
  overflow: hidden;
  background: white;
}

.panel-content {
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.media-viewer {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-top: none;
}

.app-iframe-container,
.video-container,
.image-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-media {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.image-gallery {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0.5rem;
  background: #ffffff;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.image-gallery::-webkit-scrollbar { display: none; }

.image-item {
  cursor: pointer;
  width: 100%;
  background: #ffffff;
}

.image-item img {
  width: 100%;
  height: auto;
  display: block;
  transition: filter 0.3s ease;
}

.image-item:hover img { filter: brightness(1.05); }

@media (max-width: 768px) {
  .split-container { flex-direction: column; }
  .left-panel { height: 40vh; }
  .right-panel { width: 100% !important; height: 60vh; }
}
</style>

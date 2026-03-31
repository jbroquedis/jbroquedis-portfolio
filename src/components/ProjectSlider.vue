<template>
  <div 
    v-if="shouldShowSlider" 
    class="project-slider glass"
    :style="{ height: sliderHeight + 'px' }"
    @wheel="handleWheel"
  >
    <!-- Resize handle -->
    <div class="resize-handle glass-interactive" @mousedown="startResize" @dblclick="resetHeight">
      <span class="handle-dots">⠿</span>
    </div>
    
    <div class="slider-container">
      <div class="wheel-container">
        <div 
          class="project-thumbnail glass-interactive" 
          v-for="([projectKey, project], index) in getVisibleProjects()" 
          :key="`${projectKey}-${index}`"
          :class="{ 
            active: isActive(projectKey),
            center: isCenterProject(index),
            'fade-left': isLeftFaded(index),
            'fade-right': isRightFaded(index)
          }"
          :style="{ 
            ...getProjectStyle(index),
            height: thumbnailHeight + 'px'
          }"
          :data-category="categoryClass"
          @click="selectProject(projectKey)"
        >
          <div class="thumbnail-image">
            <img 
              :src="getProjectImage(projectKey, project)" 
              @error="handleImageError($event, projectKey)" 
              :alt="project.name" 
            />
          </div>
          <!-- Only show project info for non-architecture/computational-design projects -->
          <div v-if="shouldShowProjectInfo" class="project-info">
            <div class="project-title">{{ getProjectDisplayName(projectKey, project) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { projects } from '../data/projects.js'
import { getThumbnailFilename } from '../utils/imageDetection.js'

export default {
  name: 'ProjectSlider',
  setup() {
    const thumbnailErrors = ref({})
    const activeProject = ref(null)
    const route = useRoute()
    const sliderHeight = ref(120) // Start at minimal height
    const centerIndex = ref(0)
    const maxThumbnailHeight = ref(100) // Will be calculated dynamically
    let isResizing = false

    // Determine if slider should be shown based on current route
    const shouldShowSlider = computed(() => {
      return route.path !== '/' && route.path !== '/about' && route.path !== '/career'
    })

    // Determine if project names should be shown (not for architecture/computational-design)
    const shouldShowProjectInfo = computed(() => {
      return route.path !== '/architecture' && route.path !== '/computational-design' && route.path !== '/data-mgmt'
    })

    // Filter projects based on current page
    const filteredProjects = computed(() => {
      if (route.path === '/architecture') {
        return Object.fromEntries(
          Object.entries(projects).filter(([key, project]) => project.category === 'architecture')
        )
      } else if (route.path === '/computational-design') {
        return Object.fromEntries(
          Object.entries(projects).filter(([key, project]) => project.category === 'computational-design')
        )
      } else if (route.path === '/experimental') {
        return Object.fromEntries(
          Object.entries(projects).filter(([key, project]) => project.category === 'experimental')
        )
      } else if (route.path === '/data-mgmt') {
        return Object.fromEntries(
          Object.entries(projects).filter(([key, project]) => project.category === 'data-management')
        )
      }
      return {} // No projects for other routes
    })

    // Convert filtered projects to array for indexing
    const projectsArray = computed(() => {
      return Object.entries(filteredProjects.value)
    })

    // Calculate how many projects can fit on screen
    const projectsOnScreen = computed(() => {
      const screenWidth = window.innerWidth
      const projectWidth = 180 // Approximate width per project including margins
      return Math.min(Math.floor(screenWidth / projectWidth), projectsArray.value.length)
    })

    // Dynamic thumbnail height - scale more aggressively with slider height
    // so images keep up visually with the bar growth
    const thumbnailHeight = computed(() => {
      const minHeight = 60   // Minimal thumbnail height
      const maxHeight = 320  // Allow larger thumbs when the bar is expanded
      const padding = 24     // Reduced padding to give images more space

      const availableHeight = Math.max(0, sliderHeight.value - padding)
      return Math.max(minHeight, Math.min(maxHeight, availableHeight))
    })

    // Dynamic spacing ratios so margins scale with height (keep proportions when upscaled)
  const centerMarginPx = computed(() => Math.round(Math.min(40, Math.max(6, thumbnailHeight.value * 0.11))))
  const adjacentMarginPx = computed(() => Math.round(Math.min(28, Math.max(4, thumbnailHeight.value * 0.07))))
  const maxThumbWidthPx = computed(() => Math.round(Math.min(560, Math.max(180, thumbnailHeight.value * 2.6))))

    // Create infinite scroll by duplicating projects array
    const infiniteProjectsArray = computed(() => {
      const projects = projectsArray.value
      if (projects.length === 0) return []
      
      // Create enough duplicates to ensure smooth infinite scrolling
      const duplicates = Math.max(3, Math.ceil(projectsOnScreen.value * 2))
      const result = []
      
      for (let i = 0; i < duplicates; i++) {
        result.push(...projects)
      }
      
      return result
    })

    const selectProject = (key) => {
      activeProject.value = key
      
      // Update center index to the selected project
      const projectIndex = projectsArray.value.findIndex(([projectKey]) => projectKey === key)
      if (projectIndex !== -1) {
        centerIndex.value = projectIndex
      }
      
      // Emit global event for page components to listen to
      window.dispatchEvent(new CustomEvent('projectSelected', {
        detail: { projectId: key }
      }))
    }

    const isActive = (key) => {
      return key === activeProject.value
    }

    const isCenterProject = (index) => {
      const visibleCount = projectsOnScreen.value + 4
      const centerPosition = Math.floor(visibleCount / 2)
      return index === centerPosition
    }

    const isLeftFaded = (index) => {
      const visibleCount = projectsOnScreen.value + 4
      const centerPosition = Math.floor(visibleCount / 2)
      return index < centerPosition - 2
    }

    const isRightFaded = (index) => {
      const visibleCount = projectsOnScreen.value + 4
      const centerPosition = Math.floor(visibleCount / 2)
      return index > centerPosition + 2
    }

    // Get visible projects for infinite scroll
    const getVisibleProjects = () => {
      const totalProjects = projectsArray.value.length
      if (totalProjects === 0) return []
      
      const visibleCount = projectsOnScreen.value + 4 // Show extra projects on sides for smooth scrolling
      const startOffset = Math.floor(visibleCount / 2)
      
      const result = []
      for (let i = 0; i < visibleCount; i++) {
        const projectIndex = (centerIndex.value - startOffset + i + totalProjects * 10) % totalProjects
        result.push(projectsArray.value[projectIndex])
      }
      
      return result
    }

    const getProjectStyle = (index) => {
      const visibleCount = projectsOnScreen.value + 4
      const centerPosition = Math.floor(visibleCount / 2)
      const distance = Math.abs(index - centerPosition)
      const isCenter = index === centerPosition
      
      if (isCenter) {
        // Center project: no scaling, just visual distinction
        return {
          transform: 'scale(1.0)', // No upscaling to prevent cropping
          zIndex: 10,
          opacity: 1,
          filter: 'grayscale(0%)',
          marginLeft: centerMarginPx.value + 'px',
          marginRight: centerMarginPx.value + 'px',
          maxWidth: maxThumbWidthPx.value + 'px'
        }
      } else if (distance === 1) {
        // Adjacent projects
        return {
          transform: 'scale(1.0)',
          zIndex: 8,
          opacity: 0.9,
          filter: 'grayscale(0%)',
          marginLeft: adjacentMarginPx.value + 'px',
          marginRight: adjacentMarginPx.value + 'px',
          maxWidth: maxThumbWidthPx.value + 'px'
        }
      } else if (distance === 2) {
        // Second tier
        return {
          transform: 'scale(0.95)',
          zIndex: 6,
          opacity: 0.8,
          filter: 'grayscale(20%)',
          maxWidth: maxThumbWidthPx.value + 'px'
        }
      } else {
        // Outer projects
        const scale = Math.max(0.8, 1 - (distance * 0.05))
        const grayscale = Math.min(60, distance * 15)
        const opacity = Math.max(0.6, 1 - (distance * 0.1))
        
        return {
          transform: `scale(${scale})`,
          zIndex: Math.max(1, 8 - distance),
          opacity: opacity,
          filter: `grayscale(${grayscale}%)`,
          maxWidth: maxThumbWidthPx.value + 'px'
        }
      }
    }

    const handleWheel = (event) => {
      event.preventDefault()
      event.stopPropagation()
      
      const delta = event.deltaY > 0 ? 1 : -1
      const totalProjects = projectsArray.value.length
      
      if (totalProjects === 0) return
      
      // Infinite scrolling: wrap around when reaching ends
      let newIndex = centerIndex.value + delta
      if (newIndex < 0) {
        newIndex = totalProjects - 1
      } else if (newIndex >= totalProjects) {
        newIndex = 0
      }
      centerIndex.value = newIndex
      
      // Auto-select the center project
      if (projectsArray.value[centerIndex.value]) {
        const [key] = projectsArray.value[centerIndex.value]
        selectProject(key)
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
      const newHeight = window.innerHeight - e.clientY
      const minHeight = 120 // Match CSS min-height
      const maxHeight = 380 // Match CSS max-height
      
      sliderHeight.value = Math.max(minHeight, Math.min(maxHeight, newHeight))
    }

    const stopResize = () => {
      isResizing = false
      document.removeEventListener('mousemove', onResize)
      document.removeEventListener('mouseup', stopResize)
    }

    const resetHeight = () => {
      sliderHeight.value = 120
    }

    const getProjectDisplayName = (key, project) => {
      if (project.category === 'architecture') {
        return key.replace('architecture-project-', 'arch ').replace('-', ' ')
      } else if (project.category === 'computational-design') {
        return key.replace('computational-design-project-', 'comp ').replace('-', ' ')
      }
      return project.name
    }

    const getProjectImage = (key, project) => {
      if (thumbnailErrors.value[key]) {
        return `https://via.placeholder.com/200x120/f3f4f6/000000?text=${encodeURIComponent(project.name)}`
      }
      
      // Use dynamic thumbnail detection
      if (project.thumbnailPath) {
        const filename = getThumbnailFilename(key)
        return `${project.thumbnailPath}${filename}`
      }
      
      // Fallback to old structure for backwards compatibility
      if (project.images && project.images.length > 0) {
        return project.images[0]
      }
      
      return `/project-images/${key}/thumbnail.jpg`
    }

    const handleImageError = (e, key) => {
      thumbnailErrors.value[key] = true
      const project = projects[key]
      // Inline SVG data URL as a safe, offline placeholder to avoid DNS errors
      const svg = encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='120'>
          <rect width='100%' height='100%' fill='#f3f4f6'/>
          <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='10' fill='#111'>${(project?.name||'No image')}</text>
        </svg>`
      )
      e.target.src = `data:image/svg+xml;charset=UTF-8,${svg}`
    }

    // Watch for slider height changes and update CSS variable
    watch(sliderHeight, (newHeight) => {
      document.documentElement.style.setProperty('--slider-height', `${newHeight}px`)
    }, { immediate: true })

    // Keyboard navigation
    const handleKeydown = (e) => {
      if (!shouldShowSlider.value) return
      const total = projectsArray.value.length
      if (total === 0) return
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        const newIndex = (centerIndex.value - 1 + total) % total
        centerIndex.value = newIndex
        const [key] = projectsArray.value[centerIndex.value]
        selectProject(key)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        const newIndex = (centerIndex.value + 1) % total
        centerIndex.value = newIndex
        const [key] = projectsArray.value[centerIndex.value]
        selectProject(key)
      }
    }

    onMounted(() => {
      window.addEventListener('keydown', handleKeydown)
    })

    onUnmounted(() => {
      window.removeEventListener('keydown', handleKeydown)
    })

    // Category class for styling (arch/comp/exp/data)
    const categoryClass = computed(() => {
      if (route.path === '/architecture') return 'arch'
      if (route.path === '/computational-design') return 'comp'
      if (route.path === '/experimental') return 'exp'
      if (route.path === '/data-mgmt') return 'data'
      return ''
    })

    return {
      shouldShowSlider,
      shouldShowProjectInfo,
      filteredProjects,
      sliderHeight,
      thumbnailHeight,
      categoryClass,
      selectProject,
      isActive,
      isCenterProject,
      isLeftFaded,
      isRightFaded,
      getProjectStyle,
      handleWheel,
      startResize,
      resetHeight,
      getProjectDisplayName,
      getProjectImage,
      handleImageError,
      getVisibleProjects,
      projectsOnScreen,
      centerMarginPx,
      adjacentMarginPx,
      maxThumbWidthPx
    }
  }
}
</script>

<style scoped>
.project-slider {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  min-height: 120px; /* Further reduced from 160px for ultra-compact option */
  max-height: 380px; /* Reduced from 400px */
  background: #ffffff;
  border-top: 1px solid #e5e7eb;
  z-index: 100;
  overflow: hidden;
}

.resize-handle {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 12px;
  cursor: ns-resize;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border-radius: 0 0 8px 8px;
  border: 1px solid #e5e7eb;
  border-top: none;
  transition: all 0.3s ease;
}

.resize-handle:hover {
  background: #f9f9f9;
  border-color: rgba(59, 130, 246, 0.4);
}

.resize-handle span.handle-dots {
  color: #9ca3af;
  font-size: 14px;
  user-select: none;
  transition: color 0.2s ease;
  letter-spacing: 0.05em;
}

.resize-handle:hover span.handle-dots {
  color: var(--hover-orange);
}

.slider-container {
  display: flex;
  height: 100%;
  align-items: flex-end; /* Align all items to bottom */
  justify-content: center;
  padding: 6px 20px 16px 20px; /* Reduced top padding from 10px to 6px, reduced bottom from 20px to 16px */
  overflow: hidden;
}

.wheel-container {
  display: flex;
  gap: 2px; /* Minimal gap since we use margins for spacing */
  align-items: flex-end; /* All align to bottom */
  justify-content: center;
  width: 100%;
  overflow-x: visible;
  position: relative;
  background: transparent;
}

.project-thumbnail {
  flex: 0 0 auto;
  max-width: none; /* Width is controlled dynamically per item to scale with height */
  /* height will be set dynamically via inline style */
  border-radius: 0;
  overflow: visible;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: transparent;
  box-shadow: none;
  transform-origin: center bottom; /* Scale from bottom center */
  border: none;
  display: flex;
  align-items: flex-end; /* Align content to bottom */
  justify-content: center;
}

.project-thumbnail:hover {
  transform: scale(1.05) translateY(-2px) !important;
  box-shadow: none;
}

/* Active/Selected project styling: outline ring in category color */
.project-thumbnail.active {
  outline: 2px solid var(--hover-orange);
  outline-offset: 3px;
}
.project-thumbnail.active[data-category="comp"] {
  outline-color: var(--cat-comp);
}
.project-thumbnail.active[data-category="arch"] {
  outline-color: var(--cat-arch);
}
.project-thumbnail.active[data-category="exp"] {
  outline-color: var(--cat-exp);
}
.project-thumbnail.active[data-category="data"] {
  outline-color: var(--cat-data);
}

.thumbnail-image {
  height: 100%;
  width: auto;
  max-width: 100%;
  overflow: visible;
  position: relative;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  overflow: hidden;
}

.thumbnail-image img {
  max-height: 100%;
  width: auto;
  max-width: 100%;
  object-fit: contain;
  object-position: center;
  transition: all 0.4s ease;
  filter: grayscale(100%); /* Simple grayscale, no brightness changes */
  display: block;
}

/* Active/Selected project should be in full color */
.project-thumbnail.active .thumbnail-image img {
  filter: grayscale(0%);
}

/* Category-colored active underline */
.project-thumbnail.active[data-category="comp"] .thumbnail-image {
  box-shadow: inset 0 -4px 0 var(--cat-comp);
}
.project-thumbnail.active[data-category="arch"] .thumbnail-image {
  box-shadow: inset 0 -4px 0 var(--cat-arch);
}
.project-thumbnail.active[data-category="exp"] .thumbnail-image {
  box-shadow: inset 0 -4px 0 var(--cat-exp);
}

/* Center project (focused) should be in color */
.project-thumbnail.center .thumbnail-image img {
  filter: grayscale(0%);
}

/* Hover effect - show color preview */
.project-thumbnail:hover .thumbnail-image img {
  filter: grayscale(0%) !important;
}

/* Non-selected projects stay grayscale - no brightness/contrast changes */
.project-thumbnail:not(.active):not(.center):not(:hover) .thumbnail-image img {
  filter: grayscale(100%);
}

.project-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px 12px;
  background: #ffffff;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0;
}

.project-title {
  font-size: 11px;
  font-weight: 600;
  color: #374151;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 0.3s ease;
}

/* Remove special styling for center project titles */

/* Mobile responsiveness */
@media (max-width: 768px) {
  .project-slider {
    min-height: 80px; /* Ultra-compact for mobile */
    max-height: 260px; /* Reduced from 280px */
  }
  
  .project-thumbnail {
    max-width: 150px;
  }
  
  .project-title {
    font-size: 9px; /* Even smaller text to prevent wrapping */
  }
  
  .resize-handle {
    display: flex; /* Keep resize handle on mobile for drag functionality */
    height: 8px; /* Smaller handle on mobile */
    width: 40px;
  }
  
  .wheel-container {
    gap: 8px;
  }
  
  .slider-container {
    padding: 6px 15px 10px 15px; /* Further reduced padding for ultra-compact mobile */
  }
}
</style>
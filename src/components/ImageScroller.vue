<!-- ImageScroller.vue -->
<template>
  <div 
    class="scroller-wrapper" 
    ref="scrollerRef"
    @scroll="handleScroll"
  >
    <div v-if="debugInfo" class="debug-info">
      <p>Project Name: {{ projectName }}</p>
      <p>Image List: {{ imageList.length }} images</p>
      <p>Base URL: {{ baseUrl }}</p>
    </div>
    
    <!-- Duplicated images for infinite scroll effect -->
    <img
      v-for="(src, index) in displayImages"
      :key="`${projectName}-${index}`"
      :src="src"
      class="image"
      :style="maxHeightStyle"
    />

    <div v-if="imageList.length === 0 && !loading" class="no-images">
      <p>No images found for {{ projectName }}</p>
      <button @click="loadImages(true)">Retry Loading</button>
    </div>
    
    <div v-if="loading" class="loading">
      <p>Loading images...</p>
    </div>
  </div>
</template>

<script>
import { projects } from '../data/projects.js'
import { knownGalleryImages, sortImages } from '../utils/imageDetection.js'

export default {
  props: {
    projectName: {
      type: String,
      required: true
    },
    viewerHeight: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      imageList: [],
      maxImages: 20,
      debugInfo: false,
      loadingFailed: false,
      loading: false,
      baseUrl: '',
      isAdjustingScroll: false
    }
  },
  computed: {
    maxHeightStyle() {
      if (this.viewerHeight > 0) {
        return {
          maxHeight: `${this.viewerHeight}px`,
          width: 'auto'
        }
      }
      return {}
    },
    // Get project category from project data
    projectCategory() {
      const project = projects[this.projectName]
      return project?.category || this.getCategoryFromKey(this.projectName)
    },
    // Build the gallery base path
    galleryBasePath() {
      return `/projects/${this.projectCategory}/${this.projectName}/gallery/`
    },
    // Triple the images for seamless wrapping (before + original + after)
    displayImages() {
      if (this.imageList.length === 0) return []
      // Duplicate images 3 times for infinite scroll illusion
      return [...this.imageList, ...this.imageList, ...this.imageList]
    }
  },
  watch: {
    projectName: {
      immediate: true,
      handler() {
        this.loadImages()
      }
    }
  },
  methods: {
    // Extract category from project key (e.g., 'architecture-project-1' -> 'architecture')
    getCategoryFromKey(projectKey) {
      if (projectKey.startsWith('architecture-')) return 'architecture'
      if (projectKey.startsWith('computational-design-')) return 'computational-design'
      if (projectKey.startsWith('experimental-')) return 'experimental'
      if (projectKey.startsWith('about-')) return 'about'
      return 'architecture' // default
    },
    
    handleScroll() {
      if (this.isAdjustingScroll || this.imageList.length === 0) return
      
      const scroller = this.$refs.scrollerRef
      if (!scroller) return
      
      const scrollTop = scroller.scrollTop
      const scrollHeight = scroller.scrollHeight
      const clientHeight = scroller.clientHeight
      
      // Calculate the height of one set of images (1/3 of total since we tripled them)
      const oneSetHeight = scrollHeight / 3
      
      // If scrolled to the bottom third, jump back to middle third
      if (scrollTop >= oneSetHeight * 2) {
        this.isAdjustingScroll = true
        scroller.scrollTop = scrollTop - oneSetHeight
        requestAnimationFrame(() => {
          this.isAdjustingScroll = false
        })
      }
      // If scrolled to the top third, jump to middle third
      else if (scrollTop < oneSetHeight * 0.1) {
        this.isAdjustingScroll = true
        scroller.scrollTop = scrollTop + oneSetHeight
        requestAnimationFrame(() => {
          this.isAdjustingScroll = false
        })
      }
    },
    
    async loadImages(forceReload = false) {
      if (!this.projectName) return;
      
      this.imageList = [];
      this.loadingFailed = false;
      this.loading = true;
      this.baseUrl = this.galleryBasePath;
      
      console.log(`🖼️ Loading gallery images for ${this.projectName} from ${this.baseUrl}`);
      
      // First try known gallery images from imageDetection.js
      const knownImages = knownGalleryImages[this.projectName];
      if (knownImages && knownImages.length > 0) {
        console.log(`📋 Found ${knownImages.length} known images for ${this.projectName}`);
        const sortedImages = sortImages(knownImages);
        for (const filename of sortedImages) {
          const url = `${this.baseUrl}${filename}`;
          const exists = await this.checkImage(url);
          if (exists) {
            this.imageList.push(url);
          }
        }
      }
      
      // If no known images found, try auto-detection with common patterns
      if (this.imageList.length === 0) {
        console.log(`🔍 Auto-detecting gallery images for ${this.projectName}`);
        await this.autoDetectImages();
      }
      
      this.loading = false;
      
      if (this.imageList.length === 0) {
        this.loadingFailed = true;
        console.warn(`⚠️ No images found for ${this.projectName}`);
      } else {
        console.log(`✅ Loaded ${this.imageList.length} images for ${this.projectName}`);
        // Start in the middle section for seamless wrapping
        this.$nextTick(() => {
          this.initializeScrollPosition()
        })
      }
    },
    
    initializeScrollPosition() {
      const scroller = this.$refs.scrollerRef
      if (!scroller || this.imageList.length === 0) return
      
      // Wait for images to load and get their heights
      setTimeout(() => {
        const scrollHeight = scroller.scrollHeight
        const oneSetHeight = scrollHeight / 3
        // Start at the beginning of the middle set
        scroller.scrollTop = oneSetHeight
      }, 100)
    },
    
    async autoDetectImages() {
      // Common image extensions
      const extensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
      
      // Try numbered files first (1.jpg, 2.jpg, etc.)
      for (let i = 1; i <= this.maxImages; i++) {
        for (const ext of extensions) {
          const url = `${this.baseUrl}${i}${ext}`;
          const exists = await this.checkImage(url);
          if (exists) {
            this.imageList.push(url);
            break;
          }
        }
      }
      
      // Also try common naming patterns
      const commonPatterns = [
        'main', 'cover', 'preview', 'thumb', 'image', 'photo',
        'render', 'view', 'exterior', 'interior', 'detail',
        'plan', 'section', 'elevation', 'perspective'
      ];
      
      for (const pattern of commonPatterns) {
        for (const ext of extensions) {
          const url = `${this.baseUrl}${pattern}${ext}`;
          const exists = await this.checkImage(url);
          if (exists && !this.imageList.includes(url)) {
            this.imageList.push(url);
          }
        }
      }
    },
    
    checkImage(src) {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = src;
      });
    }
  }
}
</script>

<style scoped>
.scroller-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  overflow-y: auto;
  padding: 0 1rem;
  gap: 1rem;
  background: white;
  scrollbar-color: #ccc white;
  scrollbar-width: thin;
}

.scroller-wrapper::-webkit-scrollbar {
  width: 8px;
}

.scroller-wrapper::-webkit-scrollbar-track {
  background: white;
}

.scroller-wrapper::-webkit-scrollbar-thumb {
  background-color: #bbb;
  border-radius: 4px;
}

.image {
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.debug-info {
  background-color: #f8f8f8;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 1rem;
  width: 100%;
  font-size: 12px;
  color: #666;
}

.no-images {
  margin: 1rem 0;
  padding: 1rem;
  text-align: center;
}

.no-images button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.no-images button:hover {
  background-color: #e6e6e6;
}
</style>
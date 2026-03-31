<template>
  <div class="dev-controls" v-if="isDev">
    <button @click="refreshAll" class="refresh-btn">
      🔄 Refresh All Files
    </button>
    <button @click="testDetection" class="test-btn">
      🧪 Test Detection
    </button>
    <div v-if="lastRefresh" class="last-refresh">
      Last refresh: {{ lastRefresh.toLocaleTimeString() }}
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { refreshProjectImages, testComputationalDesignProject } from '../utils/imageDetection.js'

export default {
  name: 'DevControls',
  setup() {
    const isDev = import.meta.env.DEV
    const lastRefresh = ref(null)
    
    const refreshAll = () => {
      lastRefresh.value = new Date()
      refreshProjectImages()
    }
    
    const testDetection = async () => {
      console.log('🧪 Running detection test...')
      
      // Test a few projects
      const testProjects = [
        'computational-design-project-1',
        'computational-design-project-3',
        'architecture-project-1'
      ]
      
      for (const project of testProjects) {
        if (project.startsWith('computational-design')) {
          await testComputationalDesignProject(project)
        }
      }
    }
    
    return {
      isDev,
      lastRefresh,
      refreshAll,
      testDetection
    }
  }
}
</script>

<style scoped>
.dev-controls {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.9);
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 12px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.refresh-btn, .test-btn {
  padding: 5px 10px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 11px;
  transition: all 0.2s;
}

.refresh-btn:hover {
  background: #f3f4f6;
  border-color: #9ca3af;
}

.test-btn:hover {
  background: #fef3c7;
  border-color: #f59e0b;
}

.last-refresh {
  font-size: 10px;
  color: #6b7280;
  text-align: center;
}
</style>
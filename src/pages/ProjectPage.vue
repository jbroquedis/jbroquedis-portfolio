<script setup>
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'

import ProjectViewer from '../components/ProjectViewer.vue'
import ImageScroller from '../components/ImageScroller.vue'
import ProjectStats from '../components/ProjectStats.vue'
import ResizableVertical from '../components/ResizableVertical.vue'
import ProjectSlider from '../components/ProjectSlider.vue'

import { projects } from '../data/projects.js'

const route = useRoute()

// Build the project key from category and id (e.g., 'architecture-project-1')
const currentKey = ref(`${route.params.category}-project-${route.params.id}`)

watch(
  () => [route.params.category, route.params.id],
  ([newCategory, newId]) => {
    currentKey.value = `${newCategory}-project-${newId}`
  }
)

const currentProject = computed(() => projects[currentKey.value])
</script>

<template>
  <div class="page-wrapper">
    <div class="main-content">
      <div class="stats">
        <ProjectStats :project="currentProject" />
      </div>

      <div class="viewer-zone">
        <ResizableVertical>
          <template #default>
            <div class="split-horizontal">
              <div class="left-pane">
                <ProjectViewer :speckleResource="currentProject?.speckleResource" />
              </div>
              <div class="right-pane">
                <ImageScroller :projectName="currentKey" />
              </div>
            </div>
          </template>
          <template #bottom>
            <ProjectSlider />
          </template>
        </ResizableVertical>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.top-bar {
  display: none; /* TopBar is rendered globally in App.vue */
}

.main-content {
  flex: 1;
  display: flex;
  overflow: hidden;
  height: calc(100vh - 60px);
}

.stats {
  width: 220px;
  padding: 1rem;
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
}

.viewer-zone {
  flex: 1;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.split-horizontal {
  display: flex;
  width: 100%;
  height: 100%;
}

.left-pane {
  flex: 0.7;
  overflow: hidden;
}

.right-pane {
  flex: 0.8;
  min-width: 550px;
  overflow-y: auto;
  border-left: 1px solid #ddd;
  background: #fff;
}

:deep(.vertical-wrapper) {
  height: 100% !important;
  display: flex;
  flex-direction: column;
}
</style>

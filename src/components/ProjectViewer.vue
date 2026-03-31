<script setup>
import { computed, ref } from 'vue'

const props = defineProps({ speckleResource: Object })

const iframeRef = ref(null)

// Build the embed URL from speckleResource
const embedUrl = computed(() => {
  const r = props.speckleResource || {}
  
  // If we have a direct embedUrl, use it and add embed settings
  if (r.embedUrl) {
    return addEmbedSettings(r.embedUrl)
  }
  
  // Build URL from streamId/modelId
  if (!r.streamId) return null
  
  let url = `https://app.speckle.systems/projects/${r.streamId}`
  if (r.modelId) {
    url += `/models/${r.modelId}`
  } else if (r.objectId) {
    url += `/models/${r.objectId}`
  }
  
  return addEmbedSettings(url)
})

// Build the embed URL with Speckle embed mode
// Adding ?embed=true should trigger minimal/embedded viewer mode
function addEmbedSettings(url) {
  if (!url) return url
  
  // Parse URL to separate base, query, and hash
  const hashIndex = url.indexOf('#')
  let baseAndQuery = hashIndex > -1 ? url.substring(0, hashIndex) : url
  let hash = hashIndex > -1 ? url.substring(hashIndex) : ''
  
  // Add ?embed=true to enable embed mode (minimal UI)
  const queryIndex = baseAndQuery.indexOf('?')
  let basePath = queryIndex > -1 ? baseAndQuery.substring(0, queryIndex) : baseAndQuery
  let existingParams = queryIndex > -1 ? baseAndQuery.substring(queryIndex + 1) : ''
  
  const params = new URLSearchParams(existingParams)
  params.set('embed', 'true')
  
  return `${basePath}?${params.toString()}${hash}`
}
</script>

<template>
  <div class="speckle-viewer-container">
    <iframe
      v-if="embedUrl"
      ref="iframeRef"
      :src="embedUrl"
      class="speckle-iframe"
      frameborder="0"
      allow="autoplay; fullscreen; xr-spatial-tracking"
      allowfullscreen
      loading="eager"
    ></iframe>
    <div v-else class="no-model">
      <p>No Speckle model configured</p>
    </div>
  </div>
</template>

<style scoped>
.speckle-viewer-container {
  width: 100%;
  height: 100%;
  position: relative;
  background: #ffffff;
  border-radius: 0;
  overflow: hidden;
}

.speckle-iframe {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 0;
}

.no-model {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
}
</style>
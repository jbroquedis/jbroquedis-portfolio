<template>
  <div ref="container" class="native-speckle"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch, computed } from 'vue'

// Lazy import to avoid bundling the viewer into routes that don't need it
let Viewer, CameraController
const loadViewer = async () => {
  if (!Viewer) {
    const mod = await import('@speckle/viewer')
    Viewer = mod.Viewer
    CameraController = mod.CameraController
  }
}

const props = defineProps({
  speckleResource: { type: Object, default: null }
})
const emit = defineEmits(['failed'])

const server = 'https://app.speckle.systems'
const container = ref(null)
let viewer

const resourceUrl = computed(() => {
  const r = props.speckleResource || {}
  // Build URLs using the same pattern as Speckle's web app (projects/...)
  if (r.streamId && r.modelId) return `${server}/projects/${r.streamId}/models/${r.modelId}`
  if (r.streamId && r.objectId) return `${server}/projects/${r.streamId}/objects/${r.objectId}`
  if (r.streamId) return `${server}/projects/${r.streamId}`
  return null
})

async function initViewer() {
  if (!container.value || !resourceUrl.value) return
  await loadViewer()
  if (!Viewer) return
  viewer = new Viewer(container.value, { showStats: false, verbose: false })
  await viewer.init()
  // Create camera controller extension so we can switch to orthographic
  try {
    viewer.createExtension && CameraController && viewer.createExtension(CameraController)
  } catch (e) {
    // Non-fatal; we'll still try to access any default controller if present
    console.warn('CameraController creation failed (non-fatal):', e)
  }
  try {
    // Load by URL directly (supported API)
    await viewer.loadObject(resourceUrl.value, true)
  } catch (e) {
    console.warn('Speckle native load failed, falling back to iframe:', e)
    emit('failed')
  }
  // Force orthographic projection after first render if API exists
  try {
    // Prefer type-based access if available
    const cam = (CameraController && viewer?.getExtension?.(CameraController))
      || viewer?.getExtension?.('CameraController')
      || viewer?.getExtension?.('DefaultCameraController')
    // Try multiple method names across viewer versions
    cam?.setOrthoCameraOn?.()
    cam?.setOrthographicCamera?.()
    cam?.setProjectionMode?.('orthographic')
    cam?.setProjection?.('orthographic')
    cam?.toggleProjectionMode?.('orthographic')
    await viewer?.zoomExtents?.()
  } catch {}
}

onMounted(() => {
  initViewer()
})

onBeforeUnmount(() => {
  try { viewer?.dispose && viewer.dispose() } catch {}
})

watch(() => resourceUrl.value, async () => {
  if (!viewer) return initViewer()
  try {
    await viewer.unloadAll()
    await viewer.loadObject(resourceUrl.value, true)
    const cam = (CameraController && viewer?.getExtension?.(CameraController))
      || viewer?.getExtension?.('CameraController')
      || viewer?.getExtension?.('DefaultCameraController')
    cam?.setOrthoCameraOn?.()
    cam?.setOrthographicCamera?.()
    cam?.setProjectionMode?.('orthographic')
    cam?.setProjection?.('orthographic')
    cam?.toggleProjectionMode?.('orthographic')
  } catch (e) { console.warn('Reload failed', e); emit('failed') }
})
</script>

<style scoped>
.native-speckle {
  width: 100%;
  height: 100%;
}
</style>

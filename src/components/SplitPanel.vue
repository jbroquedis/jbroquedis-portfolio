<template>
  <div class="split-panel">
    <!-- Left -->
    <div class="left" :style="{ width: leftWidth + '%' }">
      <slot name="left" />
    </div>

    <!-- Draggable Divider -->
    <div class="divider" @mousedown="startDrag" />

    <!-- Right -->
    <div class="right" :style="{ width: rightWidth + '%' }">
      <slot name="right" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const leftWidth = ref(50)
const rightWidth = ref(50)
let isDragging = false

const startDrag = (e) => {
  isDragging = true
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
}

const stopDrag = () => {
  isDragging = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
}

const onDrag = (e) => {
  if (!isDragging) return
  const container = document.querySelector('.split-panel')
  const rect = container.getBoundingClientRect()
  const total = rect.width
  const x = e.clientX - rect.left
  const left = (x / total) * 100
  leftWidth.value = Math.max(20, Math.min(80, left))
  rightWidth.value = 100 - leftWidth.value
}
</script>

<style scoped>
.split-panel {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.left,
.right {
  height: 100%;
  overflow: hidden;
  transition: width 0.1s ease;
}

.divider {
  width: 8px;
  cursor: col-resize;
  background-color: #eee;
  position: relative;
}

.divider::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 4px;
  height: 40px;
  background-color: #ccc;
  border-radius: 2px;
}
</style>

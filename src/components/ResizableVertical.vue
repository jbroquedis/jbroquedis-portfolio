<template>
  <div class="vertical-wrapper" ref="wrapper">
    <div class="top-panel">
      <slot />
    </div>
    <div class="bottom-panel">
      <slot name="bottom" />
    </div>
  </div>
</template>

<script setup>
// slot-based layout wrapper — no logic required
</script>

<style scoped>
.vertical-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.top-panel {
  flex: 1;
  overflow: hidden;
}

.bottom-panel {
  height: 140px;
  flex-shrink: 0;
}
</style>

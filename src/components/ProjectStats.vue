<template>
  <div class="stats-wrapper">
    <div class="title">{{ project?.name ?? '—' }}</div>
    <div>{{ project?.year ?? '—' }}</div>
    <div v-if="project?.location">{{ project.location }}</div>
    <div v-if="project?.type">{{ project.type }}</div>
  </div>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    default: null
  }
})
</script>

<style scoped>
.stats-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* ✅ align left */
  padding: 1rem;
  font-family: 'Share Tech Mono', monospace;
}
.title {
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.stats {
  width: 220px;
  padding: 1rem;
  margin-bottom: 2rem; /* ⬅️ Add this */
  display: flex;
  align-items: flex-end;
  flex-shrink: 0;
}

</style>

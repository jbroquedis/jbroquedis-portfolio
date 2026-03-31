<template>
  <div class="app-wrapper">
    <TopBar />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </main>
  <ProjectSlider />
  </div>
</template>

<script setup>
import TopBar from './components/TopBar.vue'
import ProjectSlider from './components/ProjectSlider.vue'
</script>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  background: var(--primary-bg);
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding-top: 140px; /* Account for fixed header (title + nav) */
  padding-bottom: var(--slider-height, 120px); /* Dynamic bottom slider height */
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>

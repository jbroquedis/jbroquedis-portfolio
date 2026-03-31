<template>
  <div class="not-found">
    <div class="content glass">
      <p class="code">404</p>
      <h1>Page not found</h1>
      <router-link to="/" class="home-link">← back to home</router-link>
    </div>
  </div>
</template>

<script setup>
// no logic needed
</script>

<style scoped>
.not-found {
  height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  padding: 3rem 4rem;
  border-radius: 16px;
  text-align: center;
}

.code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 5rem;
  font-weight: 700;
  color: var(--hover-orange);
  line-height: 1;
  margin-bottom: 0.5rem;
}

h1 {
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.home-link {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  color: var(--text-primary);
  text-decoration: none;
  text-transform: lowercase;
  letter-spacing: 0.05em;
  transition: color 0.2s ease;
}

.home-link:hover {
  color: var(--hover-orange);
}
</style>

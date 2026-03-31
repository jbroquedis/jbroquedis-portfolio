<template>
  <div class="contact">
    <div class="contact-inner">

      <div class="contact-left">
        <p class="label">{{ c.label }}</p>
        <h1 class="heading">{{ c.heading.split('\n')[0] }}<br>{{ c.heading.split('\n')[1] }}</h1>
        <p class="availability">
          <span class="dot"></span>
          {{ c.availability }}
        </p>
      </div>

      <div class="contact-right">
        <ul class="contact-list">
          <li>
            <span class="ct-label">{{ c.email }}</span>
            <a href="mailto:joaquin@broq.cl" class="ct-link">joaquin@broq.cl</a>
          </li>
          <li>
            <span class="ct-label">{{ c.linkedin }}</span>
            <a href="https://www.linkedin.com/in/joaquin-broquedis-7b5821198/" class="ct-link" target="_blank" rel="noopener noreferrer">Joaquin Broquedis</a>
          </li>
          <li>
            <span class="ct-label">{{ c.github }}</span>
            <a href="https://github.com/jbroquedis" class="ct-link" target="_blank" rel="noopener noreferrer">jbroquedis</a>
          </li>
          <li>
            <span class="ct-label">{{ c.based_in }}</span>
            <span class="ct-value">{{ c.location }}</span>
          </li>
        </ul>

        <div class="divider"></div>

        <p class="footnote">
          {{ c.footnote }}
        </p>
      </div>

    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useLanguage } from '../composables/useLanguage.js'

export default {
  name: 'Contact',
  setup() {
    const { t } = useLanguage()
    const c = computed(() => t('contact'))
    return { c }
  }
}
</script>

<style scoped>
.contact {
  min-height: calc(100vh - 140px - var(--slider-height, 120px));
  display: flex;
  align-items: center;
  padding: 0 4rem;
}

.contact-inner {
  display: flex;
  gap: 6rem;
  align-items: flex-start;
  max-width: 860px;
}

/* ── Left column ── */
.contact-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--hover-orange);
  margin: 0;
}

.heading {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2.2rem, 4vw, 3.6rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin: 0;
}

.availability {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: #3a8f3a;
  margin: 0;
}

.dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #3a8f3a;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

/* ── Right column ── */
.contact-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-top: 0.25rem;
}

.contact-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.contact-list li {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.ct-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-secondary, #666);
}

.ct-link,
.ct-value {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-primary);
  text-decoration: none;
  transition: color 0.15s ease;
}

.ct-link:hover {
  color: var(--hover-orange);
}

.divider {
  height: 1px;
  background: #e5e7eb;
}

.footnote {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  color: var(--text-secondary, #666);
  letter-spacing: 0.05em;
  margin: 0;
}
</style>
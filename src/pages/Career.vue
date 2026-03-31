<template>
  <div class="career">
    <div class="career-inner">

      <!-- Left column -->
      <div class="career-left">
        <p class="label">{{ c.label }}</p>
        <h1 class="heading">{{ c.heading }}</h1>
        <p class="subtitle" v-html="c.subtitle"></p>
      </div>

      <!-- Right column -->
      <div class="career-right">

        <section class="section">
          <p class="section-label">{{ c.section_experience }}</p>
          <ul class="timeline">
            <li v-for="entry in c.experience" :key="entry.org" class="entry">
              <span class="range">{{ entry.range }}</span>
              <div class="entry-body">
                <p class="role">{{ entry.role }}</p>
                <p class="org">{{ entry.org }}</p>
                <p v-if="entry.desc" class="desc">{{ entry.desc }}</p>
              </div>
            </li>
          </ul>
        </section>

        <div class="divider"></div>

        <section class="section">
          <p class="section-label">{{ c.section_education }}</p>
          <ul class="timeline">
            <li v-for="entry in c.education" :key="entry.org + entry.range" class="entry">
              <span class="range">{{ entry.range }}</span>
              <div class="entry-body">
                <p class="role">{{ entry.role }}</p>
                <p class="org">{{ entry.org }}</p>
                <p v-if="entry.desc" class="desc">{{ entry.desc }}</p>
              </div>
            </li>
          </ul>
        </section>

      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useLanguage } from '../composables/useLanguage.js'

export default {
  name: 'Career',
  setup() {
    const { t } = useLanguage()
    const c = computed(() => t('career'))
    return { c }
  }
}
</script>

<style scoped>
.career {
  min-height: calc(100vh - 140px - var(--slider-height, 0px));
  display: flex;
  align-items: flex-start;
  padding: 3rem 4rem;
}

.career-inner {
  display: flex;
  gap: 6rem;
  align-items: flex-start;
  width: 100%;
  max-width: 1000px;
}

/* ── Left ── */
.career-left {
  flex: 0 0 200px;
  position: sticky;
  top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--hover-orange);
  margin: 0;
}

.heading {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2rem, 3.5vw, 3rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin: 0;
}

.subtitle {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  color: #bbbbbb;
  margin: 0;
  line-height: 1.7;
}

/* ── Right ── */
.career-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-top: 0.1rem;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #bbbbbb;
  margin: 0;
}

/* ── Timeline ── */
.timeline {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

.entry {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 1rem;
  align-items: flex-start;
}

.range {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.06em;
  color: #aaaaaa;
  padding-top: 0.15rem;
  white-space: nowrap;
}

.entry-body {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.role {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  letter-spacing: -0.01em;
}

.org {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  color: var(--hover-orange);
  margin: 0;
}

.desc {
  font-size: 0.82rem;
  color: #888888;
  margin: 0.3rem 0 0 0;
  line-height: 1.7;
}

/* ── Divider ── */
.divider {
  height: 1px;
  background: #e5e7eb;
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .career {
    padding: 2rem 1.5rem;
  }

  .career-inner {
    flex-direction: column;
    gap: 2.5rem;
  }

  .career-left {
    position: static;
    flex: none;
  }

  .entry {
    grid-template-columns: 1fr;
    gap: 0.3rem;
  }
}
</style>

<template>
  <div class="home">
    <div class="pair">

      <!-- ── Left: bio square ── -->
      <div class="bio">
        <div class="bio-top">
          <p class="label">{{ h.label }}</p>
          <p class="name">Joaquin Broquedis</p>
        </div>

        <p class="description">{{ h.description }}</p>

        <div class="meta">
          <span>{{ h.location }}</span>
          <span class="dot">·</span>
          <span>{{ h.since }}</span>
        </div>
      </div>

      <!-- ── Right: portrait square ── -->
      <div class="portrait">
        <AsciiPortrait />
      </div>

    </div>
  </div>
</template>

<script setup>
import AsciiPortrait from '../components/AsciiPortrait.vue'
import { useLanguage } from '../composables/useLanguage.js'
import { computed } from 'vue'

const { t } = useLanguage()
const h = computed(() => t('home'))
</script>

<style scoped>
/* Escape App.vue's padding entirely — fill exact viewport between topbar and nothing */
.home {
  position: fixed;
  top: 60px;   /* topbar height */
  left: 0;
  right: 0;
  bottom: 0;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 0;
}

/* Two squares side by side, no gap between them */
.pair {
  display: flex;
  align-items: center;
  gap: 5rem;
}

/* Both blocks are the same fixed square */
.bio,
.portrait {
  width: 380px;
  height: 380px;
  flex-shrink: 0;
}

/* ── Bio ─────────────────────────────────────────────────────────────────── */
.bio {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.bio-top {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #bbbbbb;
  margin: 0;
}

.name {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: var(--text-primary);
  margin: 0;
}

.description {
  font-size: 0.85rem;
  font-weight: 400;
  line-height: 1.85;
  color: #888888;
  margin: 0;
  flex: 1;
  display: flex;
  align-items: center;
}

.meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #cccccc;
}

.dot { color: var(--hover-orange); }

/* ── Portrait ────────────────────────────────────────────────────────────── */
.portrait {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── Mobile ──────────────────────────────────────────────────────────────── */
@media (max-width: 900px) {
  .home {
    position: static;
    height: auto;
    padding: 2rem;
  }

  .pair {
    flex-direction: column;
    gap: 2rem;
  }

  .bio,
  .portrait {
    width: 100%;
    height: auto;
  }

  .bio { min-height: 280px; }
  .portrait { min-height: 260px; }
}
</style>

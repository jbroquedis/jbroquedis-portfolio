<template>
  <div class="topbar">
    <!-- Combined title and navigation bar -->
    <div class="title-bar">
      <router-link to="/" class="logo-link">
        <DecodeText text="jbroquedis" :delay="0" :speed="30" class="logo-text" />
      </router-link>
      
      <!-- Navigation centered -->
      <nav class="navigation-bar">
        <router-link to="/" class="nav-item" :class="{ active: $route.name === 'about' }">
          <DecodeText :text="nav.about" :delay="100" :speed="40" />
        </router-link>
        <router-link to="/computational-design" class="nav-item comp" :class="{ active: $route.name === 'computational-design' }">
          <DecodeText :text="nav.computational_design" :delay="200" :speed="40" />
        </router-link>
        <router-link to="/architecture" class="nav-item arch" :class="{ active: $route.name === 'architecture' }">
          <DecodeText :text="nav.architecture" :delay="300" :speed="40" />
        </router-link>
        <router-link to="/data-mgmt" class="nav-item data" :class="{ active: $route.name === 'data-mgmt' }">
          <DecodeText :text="nav.data_mgmt" :delay="400" :speed="40" />
        </router-link>
        <router-link to="/experimental" class="nav-item exp" :class="{ active: $route.name === 'experimental' }">
          <DecodeText :text="nav.experimental" :delay="500" :speed="40" />
        </router-link>
        <router-link to="/career" class="nav-item" :class="{ active: $route.name === 'career' }">
          <DecodeText :text="nav.career" :delay="600" :speed="40" />
        </router-link>
        <router-link to="/contact" class="nav-item" :class="{ active: $route.name === 'contact' }">
          <DecodeText :text="nav.contact" :delay="700" :speed="40" />
        </router-link>
      </nav>
      
      <button class="lang-toggle" @click="toggleLanguage" :aria-label="`Toggle language (current: ${language})`">
        <span :class="{ active: language === 'ENG' }">eng</span>/<span :class="{ active: language === 'ESP' }">esp</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import DecodeText from './DecodeText.vue'
import { useLanguage } from '../composables/useLanguage.js'

const { language, toggleLanguage, t } = useLanguage()
const nav = computed(() => t('nav'))
</script>

<style scoped>
.topbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.title-bar {
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 60px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
}

.logo-link {
  text-decoration: none;
  flex-shrink: 0;
}

.logo-text {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
  text-decoration: none;
  text-transform: lowercase;
  letter-spacing: 0.05em;
  transition: color 0.2s ease;
}

.logo-link:hover .logo-text {
  color: var(--hover-orange);
}

.navigation-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex: 1;
}

.nav-item {
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: var(--text-primary);
  font-weight: 400;
  text-transform: lowercase;
  letter-spacing: 0.025em;
  transition: all 0.3s ease;
  position: relative;
}

.nav-item:hover {
  color: var(--hover-orange);
}

.nav-item.active {
  color: var(--hover-orange); /* About & Contact use hover orange when active */
  font-weight: 600;
}

/* Animated underline bar */
.nav-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0.5rem;
  right: 0.5rem;
  height: 2px;
  background: var(--hover-orange);
  transform: scaleX(0);
  transition: transform 0.2s ease;
}

.nav-item.active::after {
  transform: scaleX(1);
}

/* Category-specific active colors */
.nav-item.comp.active { color: var(--cat-comp); }
.nav-item.arch.active { color: var(--cat-arch); }
.nav-item.exp.active { color: var(--cat-exp); }
.nav-item.data.active { color: var(--cat-data); }

.nav-item.comp.active::after { background: var(--cat-comp); }
.nav-item.arch.active::after { background: var(--cat-arch); }
.nav-item.exp.active::after { background: var(--cat-exp); }
.nav-item.data.active::after { background: var(--cat-data); }


.lang-toggle {
  margin-left: auto;
  padding: 0.5rem 1rem;
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-size: 0.95rem;
  text-transform: lowercase;
  cursor: pointer;
  transition: color 0.2s ease;
}

.lang-toggle:hover {
  color: var(--hover-orange);
}

.lang-toggle span.active {
  color: var(--hover-orange);
  font-weight: 700;
}


/* Responsive design */
@media (max-width: 768px) {
  .title-bar {
    padding: 0.75rem 1rem;
  }
  
  .navigation-bar {
    padding: 0 1rem;
    gap: 0.25rem;
  }
  
  .nav-item {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
  
  .logo-text {
    font-size: 1.4rem;
  }
}

/* Add top padding to body content to account for fixed header */
:global(body) {
  padding-top: 80px;
}
</style>
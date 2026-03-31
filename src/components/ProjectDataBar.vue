<template>
  <div class="project-data-bar" v-if="projectData">
    <!-- Architecture Fields -->
    <div v-if="category === 'architecture'" class="data-fields architecture-fields">
      <div class="field">
        <DecodeText text="NAME:" :delay="0" class="label" />
        <DecodeText :text="projectData.name || 'N/A'" :delay="200" />
      </div>
      <div class="field">
        <DecodeText text="YEAR:" :delay="100" class="label" />
        <DecodeText :text="projectData.year || 'N/A'" :delay="300" />
      </div>
      <div class="field">
        <DecodeText text="ISSUED FOR:" :delay="200" class="label" />
        <DecodeText :text="projectData.issuedFor || 'N/A'" :delay="400" />
      </div>
      <div class="field">
        <DecodeText text="PROGRAMME:" :delay="300" class="label" />
        <DecodeText :text="projectData.programme || 'N/A'" :delay="500" />
      </div>
      <div class="field">
        <DecodeText text="AREA:" :delay="400" class="label" />
        <DecodeText :text="projectData.area || 'N/A'" :delay="600" />
      </div>
      <div class="field">
        <DecodeText text="COLLABORATION:" :delay="500" class="label" />
        <DecodeText :text="projectData.collaboration || 'N/A'" :delay="700" />
      </div>
      <div class="field description">
        <DecodeText text="PROJECT DESCRIPTION:" :delay="600" class="label" />
        <DecodeText :text="projectData.description || 'N/A'" :delay="800" />
      </div>
    </div>

    <!-- Computational Design Fields -->
    <div v-else-if="category === 'computational-design'" class="data-fields computational-fields">
      <div class="field">
        <DecodeText text="YEAR:" :delay="0" class="label" />
        <DecodeText :text="projectData.year || 'N/A'" :delay="200" />
      </div>
      <div class="field">
        <DecodeText text="NAME:" :delay="100" class="label" />
        <DecodeText :text="projectData.name || 'N/A'" :delay="300" />
      </div>
      <div class="field">
        <DecodeText text="ISSUED FOR:" :delay="200" class="label" />
        <DecodeText :text="projectData.issuedFor || 'N/A'" :delay="400" />
      </div>
      <div class="field">
        <DecodeText text="TECH STACK:" :delay="300" class="label" />
        <DecodeText :text="projectData.techStack || 'N/A'" :delay="500" />
      </div>
      <div class="field">
        <DecodeText text="COLLABORATION:" :delay="400" class="label" />
        <DecodeText :text="projectData.collaboration || 'N/A'" :delay="600" />
      </div>
      <div class="field description">
        <DecodeText text="TEXT DESCRIPTION:" :delay="500" class="label" />
        <DecodeText :text="projectData.textDescription || projectData.description || 'N/A'" :delay="700" />
      </div>
    </div>
    <!-- Experimental/Data Management Fields -->
    <div v-else class="data-fields experimental-fields">
      <div class="field">
        <DecodeText text="NAME:" :delay="0" class="label" />
        <DecodeText :text="projectData.name || 'N/A'" :delay="200" />
      </div>
      <div class="field">
        <DecodeText text="YEAR:" :delay="100" class="label" />
        <DecodeText :text="projectData.year || 'N/A'" :delay="300" />
      </div>
      <div class="field">
        <DecodeText text="TYPE:" :delay="200" class="label" />
        <DecodeText :text="projectData.type || 'N/A'" :delay="400" />
      </div>
      <div class="field">
        <DecodeText text="TECH STACK:" :delay="300" class="label" />
        <DecodeText :text="(projectData.technologies || projectData.techStack || []).join(', ') || 'N/A'" :delay="500" />
      </div>
      <div class="field description">
        <DecodeText text="DESCRIPTION:" :delay="400" class="label" />
        <DecodeText :text="projectData.description || 'N/A'" :delay="600" />
      </div>
    </div>
  </div>
</template>

<script>
import DecodeText from './DecodeText.vue'

export default {
  name: 'ProjectDataBar',
  components: {
    DecodeText
  },
  props: {
    projectData: {
      type: Object,
      default: null
    },
    category: {
      type: String,
      required: true,
      validator: (value) => ['architecture', 'computational-design', 'experimental', 'data-management'].includes(value)
    }
  }
}
</script>

<style scoped>
.project-data-bar {
  background: #ffffff;
  border-top: none; /* No top border to seamlessly connect with menu */
  border-bottom: 1px solid #e5e7eb; /* Bottom border for separation from content */
  margin-top: 0;
  padding: 0.5rem 2rem; /* Much smaller padding to match top bar */
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 0.75rem; /* Even smaller text */
  line-height: 1.0; /* Very tight line height */
  min-height: 50px; /* Similar to top bar, but slightly smaller */
  max-height: 50px; /* Fixed height to prevent growing */
  position: fixed; /* Fix to top */
  top: 80px; /* Just below new single-row topbar */
  left: 0;
  right: 0;
  z-index: 999; /* Just below top menu (which is 1000) but above everything else */
}

.data-fields {
  display: flex;
  flex-wrap: nowrap; /* Prevent wrapping */
  gap: 1rem; /* Smaller gap */
  align-items: center; /* Center align for compact layout */
  overflow: hidden; /* Hide overflow instead of wrapping */
  height: 100%; /* Use full height of container */
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.15rem; /* Slightly larger gap for better separation */
  min-width: 80px; /* Even more compact */
  flex-shrink: 1; /* Allow fields to shrink if needed */
  white-space: nowrap; /* Prevent text wrapping */
  overflow: hidden; /* Hide overflow text */
  justify-content: flex-start; /* Align to top instead of center */
}

.field.description {
  flex: 1;
  min-width: 200px; /* Reduced from 300px */
  white-space: nowrap; /* Prevent wrapping */
  text-overflow: ellipsis; /* Show ... for overflow text */
}

.field .label {
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em; /* Reduced letter spacing */
  font-size: 0.65rem; /* Slightly larger labels for visibility */
  opacity: 1; /* Full opacity to ensure visibility */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 2px; /* Slightly more margin */
  display: block; /* Ensure labels display properly */
}

.field span, .field div {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.7rem; /* Smaller field values */
  font-weight: 500; /* Slightly bolder for readability */
}

.architecture-fields .label {
  color: var(--cat-arch, #C70039);
}

.computational-fields .label {
  color: var(--cat-comp, #C0E218);
}

.experimental-fields .label {
  color: var(--cat-exp, #111D5E);
}

.data-fields .label {
  color: var(--cat-data, #0EA5E9);
}

.field span {
  font-weight: 400;
  color: var(--text-primary, #1f2937);
  line-height: 1.4;
}

.description span {
  max-width: 600px;
  text-align: justify;
}

/* Responsive design */
@media (max-width: 1024px) {
  .data-fields {
    gap: 1rem;
  }
  
  .field {
    min-width: 100px;
  }
  
  .field.description {
    min-width: 250px;
  }
}

@media (max-width: 768px) {
  .project-data-bar {
    padding: 0.4rem 1rem; /* Ultra-compact on mobile */
    font-size: 0.6rem; /* Tiny text for mobile */
    min-height: 40px; /* Even smaller on mobile */
    max-height: 40px;
  }
  
  .data-fields {
    flex-direction: row; /* Keep horizontal on mobile too */
    flex-wrap: nowrap; /* Never wrap */
    gap: 0.4rem; /* Tiny gap on mobile */
  }
  
  .field {
    min-width: 50px; /* Ultra-compact fields */
    font-size: 0.55rem; /* Tiny text */
  }
  
  .field label {
    font-size: 0.5rem; /* Tiny labels */
  }
  
  .field.description {
    min-width: 100px; /* Compact description */
    max-width: 150px; /* Strict limit */
  }
}
</style>
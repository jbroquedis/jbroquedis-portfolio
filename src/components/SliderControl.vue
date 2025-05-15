// SliderControl.vue - Reusable slider component

<template>
  <div class="slider-control">
    <label>{{ label }}: {{ displayValue }}</label>
    <input 
      type="range" 
      :min="min" 
      :max="max" 
      :step="step"
      :value="value"
      @input="updateValue($event)" 
      @mousedown.stop
    >
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String, required: true },
    value: { type: Number, required: true },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 1 },
    step: { type: Number, default: 0.01 },
    decimals: { type: Number, default: 2 }, 
    suffix: { type: String, default: '' }
  },
  emits: ['update:value'],
  computed: {
    displayValue() {
      return this.value.toFixed(this.decimals) + this.suffix;
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('update:value', Number(event.target.value));
    }
  }
};
</script>

<style scoped>
.slider-control {
  margin-bottom: 8px;
}

.slider-control label {
  display: block;
  font-size: 12px;
  color: #666;
  margin-bottom: 3px;
}

.slider-control input[type="range"] {
  width: 100%;
  margin: 2px 0;
}
</style>
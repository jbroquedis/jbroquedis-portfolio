// SoundControls.vue - Separated sound control panel

<template>
  <div class="sound-controls" @click.stop @mousedown.stop>
    <button v-if="!expanded" @click.stop="expanded = true" class="toggle-btn">Sound Controls</button>
    
    <div v-if="expanded" class="panel">
      <div class="panel-header">
        <h3>Sound Controls</h3>
        <button @click.stop="expanded = false" class="close-btn">×</button>
      </div>
      
      <div class="panel-content">
        <!-- Ambient -->
        <div class="control-group">
          <h4>Ambient Chord</h4>
          <slider-control 
            label="Volume" 
            :value="ambientVol" 
            :min="0" 
            :max="0.3" 
            :step="0.01" 
            @update:value="$emit('update:ambientVol', $event)" 
          />
        </div>
        
        <!-- Ripple -->
        <div class="control-group">
          <h4>Ripple Sound</h4>
          <slider-control 
            label="Frequency" 
            :value="rippleFreq" 
            :min="80" 
            :max="400" 
            :step="1" 
            @update:value="$emit('update:rippleFreq', $event)" 
          />
          <slider-control 
            label="Volume" 
            :value="rippleVol" 
            :min="0" 
            :max="1" 
            :step="0.01" 
            @update:value="$emit('update:rippleVol', $event)" 
          />
          <slider-control 
            label="Filter" 
            :value="filter" 
            :min="100" 
            :max="2000" 
            :step="10" 
            :suffix="'Hz'" 
            @update:value="$emit('update:filter', $event)" 
          />
        </div>
        
        <!-- Wave Type -->
        <div class="control-group">
          <h4>Oscillator Type</h4>
          <div class="radio-group">
            <label @click.stop>
              <input 
                type="radio" 
                :checked="waveType === 'sine'" 
                @change="$emit('update:waveType', 'sine')" 
                @mousedown.stop
              > Sine
            </label>
            <label @click.stop>
              <input 
                type="radio" 
                :checked="waveType === 'triangle'" 
                @change="$emit('update:waveType', 'triangle')" 
                @mousedown.stop
              > Triangle
            </label>
            <label @click.stop>
              <input 
                type="radio" 
                :checked="waveType === 'sawtooth'" 
                @change="$emit('update:waveType', 'sawtooth')" 
                @mousedown.stop
              > Sawtooth
            </label>
          </div>
        </div>
        
        <button @click.stop="$emit('testSound', window.innerWidth/2, window.innerHeight/2)" class="test-btn">
          Test Sound
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SliderControl from './SliderControl.vue';

export default {
  components: { SliderControl },
  props: {
    ambientVol: { type: Number, default: 0.07 },
    rippleFreq: { type: Number, default: 180 },
    rippleVol: { type: Number, default: 0.6 },
    filter: { type: Number, default: 1000 },
    waveType: { type: String, default: 'sine' }
  },
  emits: [
    'update:ambientVol',
    'update:rippleFreq',
    'update:rippleVol',
    'update:filter',
    'update:waveType',
    'testSound'
  ],
  data() {
    return {
      expanded: true
    };
  }
};
</script>

<style scoped>
.sound-controls {
  position: fixed;
  z-index: 9999;
}

.toggle-btn {
  position: fixed;
  top: 10px;
  right: 10px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  font-weight: bold;
  z-index: 9999;
}

.panel {
  position: fixed;
  top: 10px;
  right: 10px;
  width: 260px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  z-index: 9999;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
  background-color: #f8f8f8;
  border-radius: 8px 8px 0 0;
}

.panel-header h3 {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  color: #666;
  cursor: pointer;
}

.panel-content {
  padding: 15px;
  max-height: 80vh;
  overflow-y: auto;
}

.control-group {
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.control-group h4 {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #444;
}

.radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
}

.radio-group label {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #666;
}

.test-btn {
  width: 100%;
  padding: 8px;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}
</style>
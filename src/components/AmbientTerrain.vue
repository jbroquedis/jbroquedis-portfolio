// AmbientTerrain.vue - Main terrain component

<template>
  <div class="terrain">
    <div id="p5-container"></div>
    <sound-controls 
      v-if="initialized"
      v-model:ambient-vol="settings.ambientVol" 
      v-model:ripple-freq="settings.rippleFreq"
      v-model:ripple-vol="settings.rippleVol"
      v-model:filter="settings.filter"
      v-model:wave-type="settings.waveType"
      @test-sound="triggerSound"
    />
  </div>
</template>

<script>
import SoundControls from './SoundControls.vue';
import P5 from 'p5';

export default {
  components: { SoundControls },
  data() {
    return {
      p5: null,
      initialized: false,
      settings: {
        ambientVol: 0.07,
        rippleFreq: 180,
        rippleVol: 0.6,
        filter: 1000, 
        waveType: 'sine'
      },
      sound: null
    };
  },
  mounted() {
    this.initializeSketch();
  },
  methods: {
    initializeSketch() {
      this.p5 = new P5(sketch => {
        // Grid variables
        let cols, rows, zoff = 0;
        const scl = 20;
        const ripples = [];
        const baseNotes = [65.41, 77.78, 98.00]; // C2, Eb2, G2
        let chord, noise, filter;
        
        sketch.setup = () => {
          // Create canvas
          const canvas = sketch.createCanvas(window.innerWidth, window.innerHeight);
          canvas.parent('p5-container');
          
          cols = sketch.floor(sketch.width / scl);
          rows = sketch.floor(sketch.height / scl);
          
          sketch.noiseDetail(4, 0.5);
          sketch.frameRate(30);
          sketch.strokeWeight(1);
          
          // Initialize sound (simplified)
          setTimeout(() => {
            this.initSound(sketch, baseNotes);
            this.initialized = true;
          }, 500);
          
          // Handle resize
          window.addEventListener('resize', () => {
            sketch.resizeCanvas(window.innerWidth, window.innerHeight);
            cols = sketch.floor(sketch.width / scl);
            rows = sketch.floor(sketch.height / scl);
          });
        };
        
        sketch.draw = () => {
          sketch.background('#f5f0e6');
          sketch.noFill();
          
          // Draw terrain
          let yoff = 0;
          for (let y = 0; y < rows; y++) {
            let xoff = 0;
            sketch.beginShape();
            for (let x = 0; x < cols; x++) {
              let px = x * scl;
              let py = y * scl;
              
              // Base terrain elevation
              let elevation = sketch.map(sketch.noise(xoff, yoff, zoff), 0, 1, -50, 50);
              
              // Mouse interaction
              let mouseDist = sketch.dist(px, py, sketch.mouseX, sketch.mouseY);
              let lift = sketch.constrain(sketch.map(mouseDist, 0, 35, 1, 0), 0, 1);
              elevation += lift * -40;
              
              // Ripple effects
              for (let r of ripples) {
                let d = sketch.dist(px, py, r.x, r.y);
                let wavefront = (sketch.frameCount - r.frame) * 0.1;
                let phase = d * 0.015 - wavefront;
                if (sketch.abs(phase) < sketch.PI) {
                  elevation += sketch.sin(phase) * sketch.exp(-d * 0.005) * 30;
                }
              }
              
              sketch.stroke('#3e2f2f');
              sketch.curveVertex(px, py + elevation);
              xoff += 0.1;
            }
            sketch.endShape();
            yoff += 0.1;
          }
          
          // Update animation
          zoff += 0.002;
          
          // Clean up old ripples
          while (ripples.length > 0 && sketch.frameCount - ripples[0].frame > 300) {
            ripples.shift();
          }
        };
        
        sketch.mousePressed = () => {
          // Don't create ripples when clicking on controls
          const controls = document.querySelector('.sound-controls');
          if (controls && controls.contains(document.elementFromPoint(sketch.mouseX, sketch.mouseY))) {
            return;
          }
          
          if (sketch.mouseX > 0 && sketch.mouseX < sketch.width && 
              sketch.mouseY > 0 && sketch.mouseY < sketch.height) {
            this.triggerSound(sketch.mouseX, sketch.mouseY);
            return false;
          }
        };
        
        this.sound = {
          addRipple: (x, y) => {
            ripples.push({ x, y, frame: sketch.frameCount });
          }
        };
      });
    },
    
    initSound(p, notes) {
      try {
        // Create ambient chord
        const chord = [];
        for (let freq of notes) {
          let osc = new window.p5.Oscillator(this.settings.waveType);
          osc.freq(freq);
          osc.amp(this.settings.ambientVol);
          osc.start();
          chord.push({ osc, base: freq });
        }
        
        // Store references
        window.chord = chord;
        this.sound.chord = chord;
      } catch (e) {
        console.error("Error initializing sound:", e);
      }
    },
    
    triggerSound(x, y) {
      if (!this.sound) return;
      
      // Add visual ripple
      this.sound.addRipple(x, y);
      
      // Create sound for ripple (simplified)
      try {
        const freq = this.settings.rippleFreq;
        const osc = new window.p5.Oscillator(this.settings.waveType);
        const filter = new window.p5.LowPass();
        
        osc.disconnect();
        osc.connect(filter);
        filter.freq(this.settings.filter);
        filter.res(1.5);
        
        osc.freq(freq);
        osc.start();
        osc.amp(this.settings.rippleVol, 0.01);
        osc.amp(0, 0.5);
        
        setTimeout(() => osc.stop(), 1000);
      } catch (e) {
        console.error("Error creating ripple sound:", e);
      }
    }
  },
  watch: {
    'settings.ambientVol'(val) {
      if (this.sound && this.sound.chord) {
        this.sound.chord.forEach(voice => {
          if (voice.osc) voice.osc.amp(val, 0.1);
        });
      }
    },
    'settings.waveType'(val) {
      if (this.sound && this.sound.chord) {
        this.sound.chord.forEach(voice => {
          if (voice.osc) voice.osc.setType(val);
        });
      }
    }
  }
};
</script>

<style scoped>
.terrain {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

#p5-container {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
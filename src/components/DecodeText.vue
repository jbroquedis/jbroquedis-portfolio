<template>
  <span ref="textElement" class="decode-text" :style="{ width: reservedWidth }">
    <span class="invisible-text" ref="measureText">{{ text }}</span>
    <span class="visible-text">{{ displayText }}</span>
  </span>
</template>

<script>
export default {
  name: 'DecodeText',
  props: {
    text: {
      type: String,
      required: true
    },
    delay: {
      type: Number,
      default: 0
    },
    speed: {
      type: Number,
      default: 25 // milliseconds between character reveals (2x faster)
    },
    glitchChars: {
      type: String,
      default: '0123456789'
    },
    iterations: {
      type: Number,
      default: 3 // how many times each character glitches before revealing
    }
  },
  data() {
    return {
      displayText: '',
      isDecoding: false,
      animationTimeout: null,
      reservedWidth: 'auto'
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.calculateWidth()
      this.startDecoding()
    })
  },
  beforeUnmount() {
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout)
    }
  },
  methods: {
    calculateWidth() {
      if (this.$refs.measureText) {
        const width = this.$refs.measureText.offsetWidth
        this.reservedWidth = width + 'px'
      }
    },
    
    startDecoding() {
      if (this.isDecoding) return
      
      this.isDecoding = true
      this.displayText = this.generateInitialGlitch()
      
      // Start with delay if specified
      setTimeout(() => {
        this.decodeAnimation()
      }, this.delay)
    },
    
    generateInitialGlitch() {
      // Generate a string of random characters with the same length as target text
      let result = ''
      for (let i = 0; i < this.text.length; i++) {
        if (this.text[i] === ' ') {
          result += ' ' // Preserve spaces
        } else {
          result += this.getRandomChar()
        }
      }
      return result
    },
    
    decodeAnimation() {
      const targetText = this.text
      const totalLength = targetText.length
      let currentStep = 0
      
      const animate = () => {
        let result = ''
        
        for (let i = 0; i < totalLength; i++) {
          if (i < currentStep) {
            // Character is already decoded
            result += targetText[i]
          } else if (i === currentStep) {
            // Currently decoding character - show random glitch for a few iterations
            const iterationsLeft = this.iterations - (currentStep * this.iterations / totalLength)
            if (Math.random() < 0.7 && iterationsLeft > 0) {
              result += this.getRandomChar()
            } else {
              result += targetText[i]
            }
          } else {
            // Future characters - show random glitch or space
            if (Math.random() < 0.3) {
              result += this.getRandomChar()
            } else {
              result += ' '
            }
          }
        }
        
        this.displayText = result
        
        // Move to next character
        if (currentStep < totalLength) {
          currentStep += Math.random() < 0.8 ? 1 : 0 // Sometimes stay on same character for glitch effect
          
          this.animationTimeout = setTimeout(animate, this.speed)
        } else {
          // Animation complete - show final text
          this.displayText = targetText
          this.isDecoding = false
          this.$emit('complete')
        }
      }
      
      animate()
    },
    
    getRandomChar() {
      return this.glitchChars[Math.floor(Math.random() * this.glitchChars.length)]
    },
    
    // Public method to restart animation
    restart() {
      if (this.animationTimeout) {
        clearTimeout(this.animationTimeout)
      }
      this.$nextTick(() => {
        this.calculateWidth()
        this.startDecoding()
      })
    }
  },
  watch: {
    text() {
      this.$nextTick(() => {
        this.calculateWidth()
        this.restart()
      })
    }
  }
}
</script>

<style scoped>
.decode-text {
  font-family: 'Space Grotesk', 'Courier New', monospace;
  font-weight: inherit;
  color: inherit;
  letter-spacing: 0.05em;
  position: relative;
  display: inline-block;
  overflow: hidden;
}

.invisible-text {
  position: absolute;
  top: -9999px;
  left: -9999px;
  visibility: hidden;
  white-space: nowrap;
  font-family: inherit;
  font-weight: inherit;
  font-size: inherit;
  letter-spacing: inherit;
  pointer-events: none;
}

.visible-text {
  display: block;
  white-space: nowrap;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
  letter-spacing: inherit;
}
</style>
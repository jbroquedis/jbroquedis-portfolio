<template>
  <div class="ascii-portrait">
    <canvas ref="sourceCanvas" class="src-canvas" />
    <pre ref="displayEl" class="ascii-display" aria-label="Portrait of Joaquin Broquedis"></pre>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// ─── Grid dimensions ────────────────────────────────────────────────────────
// COLS/ROWS chosen so the rendered block is visually square:
//   each char is ~0.56 wide × 1.0 tall (at tight line-height)
//   → for square output: COLS * 0.56 ≈ ROWS * 1.0  → ROWS ≈ COLS * 0.56
const COLS = 120
const ROWS = 67

// Character sets — dense (dark) → sparse (light)
const CHARS  = '@#%&WMB8XOo+=*;:,. '
const GCHARS = '#%&01░▒▓~*xz+;:, '

// ─── Refs ───────────────────────────────────────────────────────────────────
const sourceCanvas = ref(null)
const displayEl    = ref(null)

// ─── Animation state (plain JS, not reactive) ───────────────────────────────
let targetGrid  = []  // correct ASCII from image
let displayGrid = []  // currently rendered
let phase       = 'loading'
let tick        = 0
let rafId       = null
let lastTime    = 0

// intro
let introProgress = 0
let rowResolveAt  = []

// idle
let nextMicroGlitch = 30
let nextBigGlitch   = 200
let nextDissolve    = 900
let activeRowShifts = []

// glitch
let glitchIntensity = 0
let glitchDecay     = 0.05

// dissolve
let dissolveMask = []
let dissolveDir  = 'out'

// ─── Util ───────────────────────────────────────────────────────────────────
const rnd  = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a
const pick = (s)    => s[Math.floor(Math.random() * s.length)]

function makeGrid (ch = ' ') {
  return Array.from({ length: ROWS }, () => new Array(COLS).fill(ch))
}

function render () {
  if (!displayEl.value) return
  let s = ''
  for (let r = 0; r < ROWS; r++) s += displayGrid[r].join('') + '\n'
  displayEl.value.textContent = s
}

// ─── Image → ASCII map ──────────────────────────────────────────────────────
async function buildAsciiMap () {
  const img = await new Promise((res, rej) => {
    const i = new Image()
    i.onload  = () => res(i)
    i.onerror = rej
    i.src = '/portrait.jpg'
  })

  const canvas = sourceCanvas.value
  canvas.width  = COLS
  canvas.height = ROWS
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  // Draw image squished to COLS×ROWS — compensates for char 2:1 aspect ratio
  ctx.drawImage(img, 0, 0, COLS, ROWS)

  const { data } = ctx.getImageData(0, 0, COLS, ROWS)
  const grid = makeGrid()
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const i   = (r * COLS + c) * 4
      const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
      grid[r][c] = CHARS[Math.floor((lum / 255) * (CHARS.length - 1))]
    }
  }
  return grid
}

// ─── Phase transitions ──────────────────────────────────────────────────────
function setPhase (name) {
  phase = name
  tick  = 0
  if (name === 'idle') {
    for (let r = 0; r < ROWS; r++) displayGrid[r] = [...targetGrid[r]]
    activeRowShifts = []
    nextMicroGlitch = rnd(60, 140)
    nextBigGlitch   = rnd(500, 900)
    nextDissolve    = rnd(2500, 4500)
  } else if (name === 'glitch') {
    glitchIntensity = 1.0
    glitchDecay     = rnd(15, 30) / 1000
  } else if (name === 'dissolve') {
    dissolveMask = Array.from({ length: ROWS }, () => new Array(COLS).fill(1.0))
    dissolveDir  = 'out'
  }
}

// ─── Phase: INTRO ───────────────────────────────────────────────────────────
function tickIntro () {
  const REVEAL_SPEED = 0.5  // rows unlocked per frame
  const DECODE_SPEED = 14   // chars per frame per row

  introProgress += REVEAL_SPEED
  const revealed = Math.floor(introProgress)

  for (let r = 0; r < Math.min(revealed, ROWS); r++) {
    if (rowResolveAt[r] == null) rowResolveAt[r] = 0
    rowResolveAt[r] += DECODE_SPEED

    for (let c = 0; c < COLS; c++) {
      if      (c < rowResolveAt[r] - DECODE_SPEED) displayGrid[r][c] = targetGrid[r][c]
      else if (c < rowResolveAt[r])                 displayGrid[r][c] = pick(GCHARS)
      // else: space — not yet reached
    }
  }

  if (revealed >= ROWS && (rowResolveAt[ROWS - 1] ?? 0) >= COLS + DECODE_SPEED) {
    setPhase('idle')
  }
}

// ─── Phase: IDLE ────────────────────────────────────────────────────────────
function tickIdle () {
  tick++
  // Restore portrait each frame (clears last frame's micro-glitches)
  for (let r = 0; r < ROWS; r++) displayGrid[r] = [...targetGrid[r]]

  // Apply active row-shift distortions
  activeRowShifts = activeRowShifts.filter(g => g.life > 0)
  for (const g of activeRowShifts) {
    const src = targetGrid[g.row]
    const dst = new Array(COLS).fill(' ')
    for (let c = 0; c < COLS; c++) {
      const s = c - g.offset
      dst[c] = (s >= 0 && s < COLS) ? src[s] : pick(CHARS)
    }
    displayGrid[g.row] = dst
    g.life--
  }

  // Micro-flicker: a handful of random chars
  const n = rnd(2, 10)
  for (let i = 0; i < n; i++) {
    const r = rnd(0, ROWS - 1)
    const c = rnd(0, COLS - 1)
    displayGrid[r][c] = pick(GCHARS)
  }

  // Spawn horizontal row-shift
  if (tick >= nextMicroGlitch) {
    const r      = rnd(3, ROWS - 4)
    const rows   = rnd(1, 3)
    const offset = rnd(3, 15) * (Math.random() > 0.5 ? 1 : -1)
    const life   = rnd(2, 6)
    for (let i = 0; i < rows; i++) {
      activeRowShifts.push({ row: (r + i) % ROWS, offset, life: life - i })
    }
    nextMicroGlitch = tick + rnd(25, 75)
  }

  if (tick >= nextBigGlitch)  { setPhase('glitch');   return }
  if (tick >= nextDissolve)   { setPhase('dissolve');  return }
}

// ─── Phase: GLITCH ──────────────────────────────────────────────────────────
function tickGlitch () {
  tick++
  for (let r = 0; r < ROWS; r++) {
    // Horizontal row displacement based on intensity
    if (Math.random() < glitchIntensity * 0.45) {
      const offset  = rnd(1, Math.max(1, Math.floor(20 * glitchIntensity)))
      const dir     = Math.random() > 0.5 ? 1 : -1
      const shifted = new Array(COLS).fill(' ')
      for (let c = 0; c < COLS; c++) {
        const s = c + dir * offset
        shifted[c] = (s >= 0 && s < COLS) ? targetGrid[r][s] : pick(GCHARS)
      }
      displayGrid[r] = shifted
    } else {
      displayGrid[r] = [...targetGrid[r]]
    }
    // Character-level corruption
    for (let c = 0; c < COLS; c++) {
      if (Math.random() < glitchIntensity * 0.25) displayGrid[r][c] = pick(GCHARS)
    }
  }

  glitchIntensity -= glitchDecay
  if (glitchIntensity <= 0) setPhase('idle')
}

// ─── Phase: DISSOLVE ────────────────────────────────────────────────────────
function tickDissolve () {
  if (dissolveDir === 'out') {
    let allGone = true
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        dissolveMask[r][c] = Math.max(0, dissolveMask[r][c] - Math.random() * 0.06)
        const m = dissolveMask[r][c]
        if (m > 0) allGone = false
        displayGrid[r][c] = m > 0.65 ? targetGrid[r][c]
                          : m > 0.25 ? pick(GCHARS)
                          : ' '
      }
    }
    if (allGone) {
      dissolveDir  = 'in'
      dissolveMask = Array.from({ length: ROWS }, () => new Array(COLS).fill(0))
    }
  } else {
    let allFull = true
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        dissolveMask[r][c] = Math.min(1, dissolveMask[r][c] + Math.random() * 0.045)
        const m = dissolveMask[r][c]
        if (m < 1) allFull = false
        displayGrid[r][c] = m > 0.7 ? targetGrid[r][c]
                          : m > 0.3 ? pick(GCHARS)
                          : ' '
      }
    }
    if (allFull) setPhase('idle')
  }
}

// ─── Main loop (~30 fps) ────────────────────────────────────────────────────
function loop (timestamp) {
  rafId = requestAnimationFrame(loop)
  if (timestamp - lastTime < 33) return   // cap at ~30 fps
  lastTime = timestamp

  if      (phase === 'intro')    tickIntro()
  else if (phase === 'idle')     tickIdle()
  else if (phase === 'glitch')   tickGlitch()
  else if (phase === 'dissolve') tickDissolve()

  render()
}

// ─── Lifecycle ───────────────────────────────────────────────────────────────
onMounted(async () => {
  // Start with random noise grid so there's always something visible
  displayGrid = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => pick(GCHARS))
  )
  render()
  rafId = requestAnimationFrame(loop)

  try {
    targetGrid    = await buildAsciiMap()
    phase         = 'intro'
    introProgress = 0
    rowResolveAt  = []
  } catch {
    // Portrait not found — run pure noise/glitch animation indefinitely
    targetGrid = Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => pick(CHARS))
    )
    phase = 'intro'
    introProgress = 0
    rowResolveAt  = []
  }
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<style scoped>
.ascii-portrait {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.src-canvas {
  display: none;
}

.ascii-display {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 5.5px;
  line-height: 1.0;
  letter-spacing: 0.02em;
  color: #000000;
  background: transparent;
  margin: 0;
  padding: 0;
  white-space: pre;
  user-select: none;
  pointer-events: none;
}
</style>

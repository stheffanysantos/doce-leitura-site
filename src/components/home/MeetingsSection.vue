<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { homePage, meetings } from '@/data/content'
import { monthYear } from '@/utils/format'

// Meetings without photos yet show this many striped placeholders.
const PLACEHOLDERS = 3
const TINTS = [15, 60, 30]

const slides = meetings.map((m) =>
  m.photos.length ? m.photos.map((src) => ({ src })) : Array.from({ length: PLACEHOLDERS }, () => ({ src: '' })),
)

// Every card cycles through its photos, offset by its index so they don't change in lockstep.
const tick = ref(0)
let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  timer = setInterval(() => tick.value++, 2800)
})
onBeforeUnmount(() => clearInterval(timer))

const current = (mi: number) => (tick.value + mi) % (slides[mi]?.length ?? 1)
const tint = (mi: number, slide: number) => TINTS[(mi + slide) % TINTS.length]
</script>

<template>
  <section id="encontros">
    <div class="container wrap">
      <div class="section-head">
        <h2 class="disp section-title">{{ homePage.meetings.title }}</h2>
        <p>{{ homePage.meetings.text }}</p>
      </div>
      <div class="grid">
        <article v-for="(m, mi) in meetings" :key="m.title" class="card">
          <div class="slider">
            <template v-for="(slide, si) in slides[mi]" :key="si">
              <img
                v-if="slide.src"
                :src="slide.src"
                :alt="`${m.title} — foto ${si + 1}`"
                class="slide"
                :class="{ active: si === current(mi) }"
                loading="lazy"
              />
              <div
                v-else
                class="slide ph"
                :class="{ active: si === current(mi) }"
                :style="{ backgroundColor: `oklch(0.93 0.03 ${tint(mi, si)})` }"
              >
                <span class="ph-label">[ foto {{ si + 1 }} · {{ m.place }} ]</span>
              </div>
            </template>
            <div v-if="(slides[mi]?.length ?? 0) > 1" class="dots">
              <span
                v-for="(_, si) in slides[mi]"
                :key="si"
                class="dot"
                :class="{ active: si === current(mi) }"
              ></span>
            </div>
          </div>
          <div class="body">
            <div class="when">{{ monthYear(m.date) }} · {{ m.place }}</div>
            <div class="disp title">{{ m.title }}</div>
            <p>{{ m.text }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.wrap {
  padding-top: 110px;
  padding-bottom: 110px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 290px), 1fr));
  gap: 28px;
}

.card {
  background: white;
  border-radius: 18px;
  overflow: hidden;
  box-shadow:
    0 1px 0 oklch(0.9 0.02 80),
    0 18px 36px -24px oklch(0.3 0.04 20 / 0.3);
}

.slider {
  position: relative;
  height: 260px;
  overflow: hidden;
  background: oklch(0.93 0.02 80);
}

.slide {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.9s ease;
}

img.slide {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slide.active {
  opacity: 1;
}

.dots {
  position: absolute;
  left: 16px;
  bottom: 14px;
  display: flex;
  gap: 6px;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 10px;
  background: oklch(0.5 0.14 15 / 0.35);
  transition: all 0.4s ease;
}

.dot.active {
  width: 20px;
  background: var(--rose);
}

.body {
  padding: 24px 26px 28px;
}

.when {
  font-size: 13px;
  font-weight: 500;
  color: var(--rose);
  margin-bottom: 8px;
}

.title {
  font-size: 22px;
  line-height: 1.25;
  margin-bottom: 10px;
}

p {
  font-size: 14.5px;
  line-height: 1.65;
  color: var(--ink-soft);
  margin: 0;
}

@media (prefers-reduced-motion: reduce) {
  .slide,
  .dot {
    transition: none;
  }
}
</style>

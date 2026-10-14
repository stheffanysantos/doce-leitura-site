<script setup lang="ts">
import { homePage } from '@/data/content'

const about = homePage.about
</script>

<template>
  <section id="sobre" class="about">
    <div class="container grid">
      <h2 class="disp section-title title">{{ about.title }}</h2>
      <div>
        <p v-for="(para, i) in about.paragraphs" :key="i">{{ para }}</p>
        <div class="stats">
          <div v-for="stat in about.stats" :key="stat.label">
            <div class="disp value">{{ stat.value }}</div>
            <div class="label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  background: var(--blush);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr));
  gap: 48px;
  padding-top: 100px;
  padding-bottom: 100px;
}

.title {
  line-height: 1.12;
}

p {
  font-size: 16.5px;
  line-height: 1.8;
  color: oklch(0.34 0.03 20);
  margin: 0 0 18px;
}

p:last-of-type {
  margin-bottom: 40px;
}

.stats {
  display: flex;
  flex-wrap: wrap;
  gap: 32px 56px;
}

.value {
  font-size: 38px;
  color: var(--rose);
}

.label {
  font-size: 13.5px;
  color: var(--ink-muted);
}
</style>

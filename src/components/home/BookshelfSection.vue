<script setup lang="ts">
import { books, homePage } from '@/data/content'
import { shortMonthYear } from '@/utils/format'

const section = homePage.bookshelf
</script>

<template>
  <section id="catalogo">
    <div class="container wrap">
      <div class="section-head">
        <h2 class="disp section-title">{{ section.title }}</h2>
        <p>{{ section.text }}</p>
      </div>
      <div class="grid">
        <div v-for="b in books" :key="b.title">
          <img v-if="b.cover" :src="b.cover" :alt="`Capa de ${b.title}`" class="cover cover-img" loading="lazy" />
          <div v-else class="cover" :style="{ background: b.color }">
            <span class="ph-label">[ capa de<br />{{ b.title }} ]</span>
          </div>
          <div class="meta">
            <div class="disp title">{{ b.title }}</div>
            <div class="byline">{{ b.author }} · {{ shortMonthYear(b.readIn) }}</div>
            <div class="vibe">"{{ b.phrase }}"</div>
          </div>
        </div>
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
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 190px), 190px));
  justify-content: start;
  gap: 48px 28px;
}

.cover {
  aspect-ratio: 2 / 3;
  border-radius: 3px 8px 8px 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 20px 30px -18px oklch(0.3 0.04 20 / 0.45),
    inset 4px 0 0 oklch(0 0 0 / 0.06);
}

.cover-img {
  display: block;
  width: 100%;
  object-fit: cover;
}

.cover .ph-label {
  font-size: 11px;
  color: oklch(0.35 0.03 20 / 0.7);
  text-align: center;
  padding: 0 12px;
}

.meta {
  margin-top: 18px;
}

.title {
  font-size: 18px;
  line-height: 1.25;
}

.byline {
  font-size: 13.5px;
  color: oklch(0.45 0.025 20);
  margin-top: 3px;
}

.vibe {
  font-size: 14px;
  line-height: 1.5;
  color: var(--rose);
  margin-top: 8px;
}
</style>

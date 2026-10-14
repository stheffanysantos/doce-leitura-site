<script setup lang="ts">
import { computed, ref } from 'vue'
import { posts, reviewsPage as page } from '@/data/content'
import { dayMonth, readingTime } from '@/utils/format'
import PostCard from '@/components/PostCard.vue'
import JoinSection from '@/components/layout/JoinSection.vue'

const ALL = page.allLabel
const filters = [ALL, ...page.categories]
const category = ref(ALL)

// The "all" filter highlights the newest post; a category filter shows a plain grid.
const featured = computed(() => (category.value === ALL ? posts[0] : undefined))
const rest = computed(() =>
  category.value === ALL ? posts.slice(1) : posts.filter((p) => p.category === category.value),
)
</script>

<template>
  <main>
    <section class="container intro">
      <RouterLink to="/" class="back">← Voltar para o início</RouterLink>
      <div class="intro-row">
        <h1 class="disp title">{{ page.title }}</h1>
        <p class="lead">{{ page.text }}</p>
      </div>
      <div class="filters" role="group" aria-label="Filtrar por categoria">
        <button
          v-for="f in filters"
          :key="f"
          type="button"
          class="filter"
          :class="{ on: f === category }"
          :aria-pressed="f === category"
          @click="category = f"
        >
          {{ f }}
        </button>
      </div>
    </section>

    <section v-if="featured" class="container featured-wrap">
      <RouterLink :to="{ name: 'review', params: { slug: featured.slug } }" class="featured">
        <img v-if="featured.image" :src="featured.image" :alt="featured.title" class="featured-image" />
        <div v-else class="featured-image ph">
          <span class="ph-label">[ imagem de destaque ]</span>
        </div>
        <div class="featured-body">
          <div class="tag">{{ featured.category }} · Destaque</div>
          <h2 class="disp featured-title">{{ featured.title }}</h2>
          <p>{{ featured.excerpt }}</p>
          <div class="byline">
            {{ featured.author }} · {{ dayMonth(featured.date) }} · {{ readingTime(featured.body) }} de leitura
          </div>
        </div>
      </RouterLink>
    </section>

    <section class="container list">
      <p v-if="!rest.length && !featured" class="empty">Nenhuma resenha nesta categoria ainda.</p>
      <div class="grid">
        <PostCard v-for="p in rest" :key="p.slug" :post="p" show-read class="card" />
      </div>
    </section>
  </main>

  <JoinSection compact :title="page.join.title" :label="page.join.button" />
</template>

<style scoped>
.intro {
  padding-top: 56px;
  padding-bottom: 40px;
}

.back {
  font-size: 14px;
  color: oklch(0.45 0.025 20);
}

/* Title on the left, intro text pushed to the right edge */
.intro-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 18px 64px;
  margin: 28px 0 40px;
}

.title {
  font-size: clamp(40px, 6vw, 72px);
  line-height: 1.08;
  letter-spacing: -0.015em;
  margin: 0;
}

.lead {
  font-size: 17px;
  line-height: 1.7;
  color: var(--ink-soft);
  max-width: 520px;
  margin: 0;
}

.filters {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.filter {
  padding: 9px 20px;
  border-radius: 100px;
  border: 1px solid oklch(0.85 0.02 60);
  background: transparent;
  color: var(--ink);
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
}

.filter:hover {
  border-color: var(--ink);
}

.filter.on {
  border-color: var(--ink);
  background: var(--ink);
  color: white;
}

.featured-wrap {
  padding-top: 24px;
}

.featured {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr));
  background: var(--blush);
  border-radius: 20px;
  overflow: hidden;
}

.empty {
  font-size: 16px;
  color: var(--ink-soft);
  margin: 0;
}

.featured-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: clamp(300px, 30vw, 460px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.featured-image .ph-label {
  color: oklch(0.5 0.04 15);
}

.featured-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  padding: clamp(28px, 4vw, 56px);
}

.tag {
  font-size: 13px;
  font-weight: 500;
  color: var(--rose);
}

.featured-title {
  font-size: clamp(28px, 3.4vw, 38px);
  line-height: 1.15;
  margin: 0;
}

.featured-body p {
  font-size: 16px;
  line-height: 1.7;
  color: oklch(0.34 0.03 20);
  max-width: 560px;
  margin: 0;
}

.byline {
  font-size: 13.5px;
  color: var(--ink-muted);
}

.list {
  padding-top: 56px;
  padding-bottom: 110px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 290px), 1fr));
  gap: 48px 32px;
}

.card :deep(.image) {
  height: 200px;
}
</style>

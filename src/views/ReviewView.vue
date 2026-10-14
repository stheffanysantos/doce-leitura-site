<script setup lang="ts">
import { computed } from 'vue'
import { posts, reviewsPage, site } from '@/data/content'
import { dayMonth, initials, readingTime } from '@/utils/format'
import SiteFooter from '@/components/layout/SiteFooter.vue'

// Unknown slugs are redirected by the router, so a post is always found here.
const props = defineProps<{ slug: string }>()

const post = computed(() => posts.find((p) => p.slug === props.slug))
const related = computed(() => posts.filter((p) => p.slug !== props.slug).slice(0, 3))
const firstName = computed(() => post.value?.author.split(' ')[0])
const letter = reviewsPage.letter
</script>

<template>
  <main v-if="post">
    <!-- Masthead -->
    <div class="masthead">
      <div class="container masthead-row">
        <span class="issue">Carta nº {{ post.issue }} · {{ dayMonth(post.date) }}</span>
        <RouterLink to="/resenhas" class="back">← Todas as cartas</RouterLink>
      </div>
    </div>

    <header class="container head">
      <div class="tag">{{ post.category }}</div>
      <h1 class="disp title">{{ post.title }}</h1>
      <p class="excerpt">{{ post.excerpt }}</p>
      <div class="byline">
        <div class="avatar">{{ initials(post.author) }}</div>
        <div>
          <div class="name">{{ post.author }}</div>
          <div class="meta">{{ dayMonth(post.date) }} · {{ readingTime(post.body) }} de leitura</div>
        </div>
      </div>
    </header>

    <div class="container">
      <img v-if="post.image" :src="post.image" :alt="post.title" class="image" />
      <div v-else class="image ph">
        <span class="ph-label">[ imagem da resenha ]</span>
      </div>
    </div>

    <!-- The letter itself: one readable column -->
    <article class="letter">
      <p class="greeting">{{ letter.greeting }}</p>
      <div class="body">
        <p v-for="(para, i) in post.body" :key="i">{{ para }}</p>
      </div>
      <blockquote class="disp quote">{{ post.quote }}</blockquote>
      <div class="signoff">
        <span>{{ letter.signoff }}</span>
        <div class="signature">
          <div class="avatar small">{{ initials(post.author) }}</div>
          <span class="name">{{ firstName }}</span>
        </div>
      </div>
    </article>

    <!-- Book + subscribe band -->
    <section class="band">
      <div class="container band-row">
        <div class="book">
          <div class="book-cover" aria-hidden="true"></div>
          <div>
            <div class="band-label">Sobre o livro</div>
            <div class="disp book-title">{{ post.book.title }}</div>
            <div class="book-author">{{ post.book.author }}</div>
          </div>
        </div>
        <div class="subscribe">
          <div>
            <div class="disp subscribe-title">{{ letter.subscribeTitle }}</div>
            <p>{{ letter.subscribeText }}</p>
          </div>
          <a :href="site.instagramUrl" target="_blank" rel="noopener" class="btn follow">{{ letter.subscribeButton }}</a>
        </div>
      </div>
    </section>

    <section class="container more">
      <div class="section-head">
        <h2 class="disp more-title">{{ letter.moreTitle }}</h2>
        <RouterLink to="/resenhas" class="link-underline">Ver todas →</RouterLink>
      </div>
      <div class="grid">
        <RouterLink
          v-for="r in related"
          :key="r.slug"
          :to="{ name: 'review', params: { slug: r.slug } }"
          class="related"
        >
          <div class="related-issue">Carta nº {{ r.issue }} · {{ r.category }}</div>
          <div class="disp related-title">{{ r.title }}</div>
          <p class="related-excerpt">{{ r.excerpt }}</p>
          <div class="related-meta">{{ r.author }} · {{ dayMonth(r.date) }}</div>
        </RouterLink>
      </div>
    </section>
  </main>
  <SiteFooter />
</template>

<style scoped>
/* Masthead */
.masthead {
  background: var(--blush);
}

.masthead-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px 24px;
  padding-top: 14px;
  padding-bottom: 14px;
}

.issue {
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--rose);
}

.back {
  font-size: 14px;
  color: oklch(0.45 0.025 20);
}

/* Header */
.head {
  padding-top: 56px;
}

.tag {
  font-size: 13.5px;
  font-weight: 500;
  color: var(--rose);
  margin-bottom: 14px;
}

.title {
  max-width: 1000px;
  font-size: clamp(34px, 5vw, 64px);
  line-height: 1.08;
  margin: 0 0 24px;
}

.excerpt {
  max-width: 720px;
  font-size: 19px;
  line-height: 1.6;
  color: oklch(0.38 0.03 20);
  margin: 0 0 28px;
}

.byline {
  display: flex;
  align-items: center;
  gap: 14px;
}

.avatar {
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  border-radius: 50%;
  background: var(--rose);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
}

.avatar.small {
  width: 34px;
  height: 34px;
  font-size: 12px;
}

.name {
  font-size: 14.5px;
  font-weight: 600;
}

.meta {
  font-size: 13px;
  color: oklch(0.45 0.025 20);
}

.image {
  width: 100%;
  object-fit: cover;
  height: clamp(240px, 36vw, 560px);
  border-radius: 20px;
  margin: 48px 0 72px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Letter */
.letter {
  max-width: calc(720px + 2 * var(--gutter));
  margin: 0 auto;
  padding: 0 var(--gutter) 120px;
}

.greeting {
  font-size: 19px;
  font-weight: 500;
  margin: 0 0 28px;
}

.body {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.body p {
  font-size: 18px;
  line-height: 1.85;
  color: oklch(0.3 0.03 20);
  margin: 0;
}

/* Drop cap on the opening paragraph */
.body p:first-child::first-letter {
  float: left;
  font-size: 4.2em;
  line-height: 0.85;
  font-weight: 600;
  color: var(--rose);
  margin: 6px 12px 0 0;
}

.quote {
  margin: 88px 0;
  padding: 48px 0;
  border-top: 1px solid oklch(0.88 0.02 60);
  border-bottom: 1px solid oklch(0.88 0.02 60);
  font-size: clamp(22px, 2.4vw, 30px);
  line-height: 1.4;
  text-align: center;
  color: var(--rose);
}

.signoff {
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 17px;
  color: oklch(0.38 0.03 20);
}

.signature {
  display: flex;
  align-items: center;
  gap: 12px;
}

.signature .name {
  font-size: 17px;
  color: var(--ink);
}

/* Book + subscribe band */
.band {
  background: var(--forest);
  color: white;
}

.band-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);
  gap: 40px clamp(48px, 7vw, 140px);
  align-items: center;
  padding-top: 64px;
  padding-bottom: 64px;
}

.book {
  display: flex;
  align-items: center;
  gap: 20px;
}

.book-cover {
  width: 56px;
  height: 80px;
  flex-shrink: 0;
  border-radius: 2px 6px 6px 2px;
  background: var(--rose);
  box-shadow: 0 14px 24px -12px oklch(0 0 0 / 0.5);
}

.band-label {
  font-size: 12.5px;
  color: oklch(0.82 0.07 15);
}

.book-title {
  font-size: 22px;
  margin-top: 4px;
}

.book-author {
  font-size: 14px;
  color: oklch(0.88 0.03 150);
}

.subscribe {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px 40px;
  padding-left: clamp(0px, 4vw, 64px);
  border-left: 1px solid oklch(0.45 0.05 160);
}

.subscribe-title {
  font-size: clamp(22px, 2.4vw, 30px);
  line-height: 1.2;
}

.subscribe p {
  font-size: 15px;
  line-height: 1.6;
  color: oklch(0.88 0.03 150);
  margin: 8px 0 0;
}

.follow {
  padding: 14px 28px;
  background: white;
  color: var(--forest);
  font-size: 14.5px;
  font-weight: 600;
}

.follow:hover {
  background: var(--rose-light);
  color: var(--forest);
}

@media (max-width: 900px) {
  .band-row {
    grid-template-columns: 1fr;
  }

  .subscribe {
    padding-left: 0;
    padding-top: 32px;
    border-left: 0;
    border-top: 1px solid oklch(0.45 0.05 160);
  }
}

/* Previous issues */
.more {
  padding-top: 80px;
  padding-bottom: 96px;
}

.more .section-head {
  margin-bottom: 36px;
  align-items: baseline;
}

.more-title {
  font-size: 30px;
  margin: 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: 28px;
}

.related {
  display: flex;
  flex-direction: column;
  padding: 28px;
  background: white;
  border-radius: 16px;
  box-shadow:
    0 1px 0 oklch(0.9 0.02 80),
    0 18px 36px -24px oklch(0.3 0.04 20 / 0.3);
  transition: transform 0.2s;
}

.related:hover {
  transform: translateY(-3px);
}

.related-issue {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--rose);
}

.related-title {
  font-size: 20px;
  line-height: 1.3;
  margin: 10px 0;
}

.related-excerpt {
  flex: 1;
  font-size: 14.5px;
  line-height: 1.6;
  color: var(--ink-soft);
  margin: 0 0 16px;
}

.related-meta {
  font-size: 13px;
  color: oklch(0.5 0.025 20);
}
</style>

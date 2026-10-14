<script setup lang="ts">
import type { Post } from '@/types/content'
import { dayMonth, readingTime } from '@/utils/format'

defineProps<{ post: Post; showRead?: boolean }>()
</script>

<template>
  <RouterLink :to="{ name: 'review', params: { slug: post.slug } }" class="post">
    <img v-if="post.image" :src="post.image" :alt="post.title" class="image" loading="lazy" />
    <div v-else class="image ph">
      <span class="ph-label">[ imagem da resenha ]</span>
    </div>
    <div>
      <div class="tag">{{ post.category }}</div>
      <div class="disp title">{{ post.title }}</div>
      <p class="excerpt">{{ post.excerpt }}</p>
      <div class="byline">
        {{ post.author }} · {{ dayMonth(post.date) }}<template v-if="showRead"> · {{ readingTime(post.body) }}</template>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.post {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.image {
  width: 100%;
  object-fit: cover;
  height: 190px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tag {
  font-size: 13px;
  font-weight: 500;
  color: var(--rose);
}

.title {
  font-size: 21px;
  line-height: 1.3;
  margin: 8px 0 10px;
}

.excerpt {
  font-size: 14.5px;
  line-height: 1.65;
  color: var(--ink-soft);
  margin: 0 0 12px;
}

.byline {
  font-size: 13px;
  color: oklch(0.5 0.025 20);
}
</style>

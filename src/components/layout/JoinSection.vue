<script setup lang="ts">
import { site } from '@/data/content'
import SiteFooter from './SiteFooter.vue'

defineProps<{
  title: string
  label: string
  text?: string
  compact?: boolean
}>()
</script>

<template>
  <section class="join">
    <div class="container cta-row" :class="{ compact }">
      <div class="copy">
        <h2 class="disp title">{{ title }}</h2>
        <p v-if="text">{{ text }}</p>
      </div>
      <a :href="site.instagramUrl" target="_blank" rel="noopener" class="btn follow">{{ label }}</a>
    </div>
    <SiteFooter divider />
  </section>
</template>

<style scoped>
.join {
  background: var(--forest);
  color: white;
}

.cta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 48px;
  flex-wrap: wrap;
  padding-top: 100px;
  padding-bottom: 100px;
}

.cta-row.compact {
  gap: 40px;
  padding-top: 72px;
  padding-bottom: 72px;
}

.copy {
  max-width: 620px;
}

.title {
  font-size: 46px;
  line-height: 1.1;
  margin: 0 0 18px;
}

.compact .copy {
  max-width: 520px;
}

.compact .title {
  font-size: clamp(28px, 3.4vw, 38px);
  line-height: 1.15;
  margin: 0;
}

p {
  font-size: 16px;
  line-height: 1.7;
  color: oklch(0.88 0.03 150);
  margin: 0;
}

.follow {
  padding: 16px 34px;
  background: white;
  color: var(--forest);
  font-size: 15px;
  font-weight: 600;
}

.follow:hover {
  background: var(--rose-light);
  color: var(--forest);
}
</style>

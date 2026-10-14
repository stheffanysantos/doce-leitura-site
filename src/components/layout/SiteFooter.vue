<script setup lang="ts">
import logo from '@/assets/images/logo-doce-leitura.webp'
import { site } from '@/data/content'

defineProps<{ divider?: boolean }>()
</script>

<template>
  <footer class="site-footer">
    <div class="container">
      <div class="bar" :class="{ divider }">
        <RouterLink to="/" class="brand" aria-label="Doce Leitura — página inicial">
          <img :src="logo" alt="Doce Leitura" width="100" height="64" loading="lazy" />
        </RouterLink>
        <span>{{ site.copyright }}</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--forest);
}

.bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px 16px;
  padding: 24px 0;
  font-size: 13px;
  color: oklch(0.88 0.03 150);
}

.bar.divider {
  padding-top: 22px;
  border-top: 1px solid oklch(0.45 0.05 160);
}

.brand img {
  display: block;
  height: 64px;
  width: auto;
}
</style>

<script setup lang="ts">
import { homePage } from '@/data/content'
</script>

<template>
  <section id="blog">
    <div class="container wrap">
      <div class="section-head">
        <h2 class="disp section-title">{{ homePage.blog.title }}</h2>
        <span class="coming-soon-label">Em breve</span>
      </div>
      <div class="coming-soon">
        <div class="disp coming-soon-title">Novos textos estão a caminho.</div>
        <p>Em breve, vamos compartilhar resenhas, reflexões e bastidores dos nossos encontros.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.wrap {
  padding-top: 110px;
  padding-bottom: 110px;
}

.section-head {
  gap: 24px;
}

.coming-soon-label {
  color: var(--rose);
  font-size: 14px;
  font-weight: 600;
}

.coming-soon {
  padding: 56px 32px;
  border: 1px solid oklch(0.86 0.03 60);
  border-radius: 20px;
  background: var(--blush);
  text-align: center;
}

.coming-soon-title {
  font-size: clamp(24px, 3vw, 34px);
  line-height: 1.2;
}

.coming-soon p {
  max-width: 520px;
  margin: 14px auto 0;
  color: var(--ink-soft);
  line-height: 1.7;
}
</style>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { site } from '@/data/content'
import logo from '@/assets/images/logo-texto-doce-leitura.svg'

const route = useRoute()
const onBlog = computed(() => route.path.startsWith('/resenhas'))

const sections = [
  { hash: '#sobre', label: 'Sobre' },
  { hash: '#livro-do-mes', label: 'Livro do mês' },
  { hash: '#catalogo', label: 'Estante' },
  { hash: '#membros', label: 'Membros' },
]
</script>

<template>
  <header class="header">
    <RouterLink to="/" class="brand" aria-label="Doce Leitura — página inicial">
      <img :src="logo" alt="Doce Leitura" class="logo" width="740" height="92" />
    </RouterLink>
    <nav class="nav hide-mobile">
      <RouterLink v-for="s in sections" :key="s.hash" :to="{ path: '/', hash: s.hash }">
        {{ s.label }}
      </RouterLink>
      <RouterLink to="/resenhas" :class="{ current: onBlog }">Blog</RouterLink>
      <RouterLink :to="{ path: '/', hash: '#encontros' }">Encontros</RouterLink>
    </nav>
    <a :href="site.instagramUrl" target="_blank" rel="noopener" class="btn cta">Participar</a>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  max-width: var(--max);
  margin: 0 auto;
  padding: 22px var(--gutter);
}

.brand {
  display: flex;
  flex-shrink: 0;
}

/* SVG wordmark; its canvas is trimmed to the text */
.logo {
  display: block;
  height: 26px;
  width: auto;
  transition: opacity 0.2s ease;
}

.brand:hover .logo {
  opacity: 0.8;
}

@media (max-width: 600px) {
  .logo {
    height: 22px;
  }
}

.nav {
  display: flex;
  gap: 26px;
}

.nav a {
  font-size: 14.5px;
  white-space: nowrap;
}

/* Highlight "Blog" on the reviews pages */
.nav .current {
  color: var(--rose);
  font-weight: 500;
}

.cta {
  padding: 10px 22px;
  background: var(--rose);
  color: white;
  font-size: 14px;
}

.cta:hover {
  background: var(--ink);
  color: white;
}
</style>

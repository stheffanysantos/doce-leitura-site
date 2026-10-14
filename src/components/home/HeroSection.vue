<script setup lang="ts">
import { homePage, site } from '@/data/content'

const hero = homePage.hero
</script>

<template>
  <section class="hero container">
    <div>
      <h1 class="disp title">{{ hero.title }}</h1>
      <p class="lead">{{ hero.text }}</p>
      <div class="actions">
        <a :href="site.instagramUrl" target="_blank" rel="noopener" class="btn primary">{{ hero.primaryButton }}</a>
        <a href="#encontros" class="link-underline">{{ hero.secondaryLink }}</a>
      </div>
    </div>
    <div class="photo" :class="{ ph: !hero.image }">
      <img v-if="hero.image" :src="hero.image" :alt="hero.imageAlt" fetchpriority="high" />
      <span v-else class="ph-label">[ foto do clube ]</span>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 380px), 1fr));
  gap: 56px;
  align-items: center;
  padding-top: 70px;
  padding-bottom: 110px;
}

.title {
  font-size: clamp(40px, 5.4vw, 84px);
  line-height: 1.06;
  letter-spacing: -0.015em;
  margin: 0 0 30px;
}

.lead {
  font-size: 17px;
  line-height: 1.75;
  color: var(--ink-soft);
  max-width: 560px;
  margin: 0 0 36px;
}

.actions {
  display: flex;
  gap: 24px;
  align-items: center;
  flex-wrap: wrap;
}

.primary {
  padding: 15px 30px;
  background: var(--ink);
  color: white;
  font-size: 14.5px;
}

.primary:hover {
  background: var(--rose);
  color: white;
}

/* Same proportion as the illustration, so nobody at the edges gets cropped.
   Its background is transparent, so the pink shows through above the group. */
.photo {
  aspect-ratio: 1448 / 1086;
  overflow: hidden;
  border-radius: clamp(120px, 14vw, 220px) clamp(120px, 14vw, 220px) 16px 16px;
  background: linear-gradient(to bottom, var(--rose-light), var(--blush));
}

.photo.ph {
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center bottom;
}
</style>

<script setup lang="ts">
import { bookOfTheMonth as book } from '@/data/content'
import { meetingDateTime, monthName } from '@/utils/format'

const details = [
  { label: 'Encontro', value: meetingDateTime(book.meetingDate) },
  { label: 'Páginas', value: book.pages },
  { label: 'Formato', value: book.format },
]
</script>

<template>
  <section id="livro-do-mes" class="botm">
    <div class="container grid">
      <img v-if="book.cover" :src="book.cover" :alt="`Capa de ${book.title}`" class="cover cover-img" />
      <div v-else class="cover">
        <span class="ribbon" aria-hidden="true"></span>
        <div class="disp cover-title">{{ book.title }}</div>
        <div class="cover-author">{{ book.author }}</div>
      </div>
      <div>
        <div class="eyebrow">Livro de {{ monthName(book.meetingDate) }}</div>
        <h2 class="disp title">{{ book.title }}</h2>
        <p class="synopsis">{{ book.synopsis }}</p>
        <div class="details">
          <div v-for="d in details" :key="d.label">
            <div class="detail-label">{{ d.label }}</div>
            <div class="detail-value">{{ d.value }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.botm {
  background: var(--forest);
  color: white;
}

/* Cover keeps its size; the text takes the rest of the row */
.grid {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 56px clamp(56px, 8vw, 140px);
  align-items: center;
  padding-top: 100px;
  padding-bottom: 100px;
}

@media (max-width: 700px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

.cover {
  position: relative;
  width: 240px;
  height: 350px;
  border-radius: 3px 10px 10px 3px;
  background: var(--rose);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 28px;
  box-shadow: 0 30px 50px -20px oklch(0 0 0 / 0.5);
}

.cover-img {
  padding: 0;
  object-fit: cover;
}

.ribbon {
  position: absolute;
  top: 0;
  right: 26px;
  width: 22px;
  height: 46px;
  background: var(--rose-light);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%);
}

.cover-title {
  font-size: 25px;
  line-height: 1.2;
}

.cover-author {
  font-size: 13px;
  margin-top: 8px;
  color: oklch(0.9 0.04 15);
}

.eyebrow {
  font-size: 14px;
  color: oklch(0.82 0.07 15);
  margin-bottom: 18px;
}

.title {
  font-size: 46px;
  line-height: 1.1;
  margin: 0 0 22px;
}

.synopsis {
  font-size: 17px;
  line-height: 1.75;
  color: oklch(0.82 0.015 20);
  max-width: 680px;
  margin: 0 0 36px;
}

.details {
  display: flex;
  flex-wrap: wrap;
  gap: 24px 48px;
}

.detail-label {
  font-size: 13px;
  color: oklch(0.7 0.02 20);
}

.detail-value {
  font-size: 15.5px;
  font-weight: 500;
  margin-top: 4px;
}
</style>

<script setup lang="ts">
import { homePage, testimonials } from '@/data/content'
import { initials } from '@/utils/format'
</script>

<template>
  <section id="membros">
    <div class="container wrap">
      <h2 class="disp section-title title">{{ homePage.testimonials.title }}</h2>
      <div class="grid">
        <figure v-for="t in testimonials" :key="t.name" class="card">
          <blockquote class="disp quote">"{{ t.quote }}"</blockquote>
          <figcaption class="person">
            <div class="avatar">{{ initials(t.name) }}</div>
            <div>
              <div class="name">{{ t.name }}</div>
              <div class="role">membro desde {{ t.memberSince }}</div>
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.wrap {
  padding-top: 100px;
  padding-bottom: 100px;
}

.title {
  margin-bottom: 56px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
  gap: 40px;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 0;
  padding: 32px 30px;
  background: var(--blush);
  border-radius: 20px;
}

.quote {
  flex: 1;
  margin: 0;
  font-size: 19px;
  line-height: 1.5;
}

.person {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--rose);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
}

.name {
  font-size: 14.5px;
  font-weight: 600;
}

.role {
  font-size: 13px;
  color: var(--ink-muted);
}
</style>

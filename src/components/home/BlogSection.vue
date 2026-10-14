<script setup lang="ts">
import { homePage, posts } from '@/data/content'
import PostCard from '@/components/PostCard.vue'

const latest = posts.slice(0, 3)
</script>

<template>
  <section id="blog">
    <div class="container wrap">
      <div class="section-head">
        <h2 class="disp section-title">{{ homePage.blog.title }}</h2>
        <RouterLink to="/resenhas" class="link-underline all">{{ homePage.blog.link }}</RouterLink>
      </div>
      <div class="grid">
        <PostCard v-for="post in latest" :key="post.slug" :post="post" />
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

.all {
  font-weight: 500;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
  gap: 40px;
}
</style>

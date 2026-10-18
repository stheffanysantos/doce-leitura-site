<script setup lang="ts">
import HeroSection from '@/components/home/HeroSection.vue'
import AboutSection from '@/components/home/AboutSection.vue'
import BookOfMonthSection from '@/components/home/BookOfMonthSection.vue'
import BookshelfSection from '@/components/home/BookshelfSection.vue'
import TestimonialsSection from '@/components/home/TestimonialsSection.vue'
import BlogSection from '@/components/home/BlogSection.vue'
import MeetingsSection from '@/components/home/MeetingsSection.vue'
import JoinSection from '@/components/layout/JoinSection.vue'
import { homePage } from '@/data/content'
</script>

<template>
  <main>
    <HeroSection />
    <AboutSection />
    <BookOfMonthSection />
    <BookshelfSection />
    <TestimonialsSection />
    <MeetingsSection />
    <BlogSection />
  </main>
  <JoinSection
    id="participar"
    :title="homePage.join.title"
    :text="homePage.join.text"
    :label="homePage.join.button"
  />
</template>

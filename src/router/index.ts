import { createRouter, createWebHistory } from 'vue-router'
import { posts, reviewsPage, site } from '@/data/content'
import HomeView from '@/views/HomeView.vue'

const SITE = site.name
const findPost = (slug: unknown) => posts.find((p) => p.slug === slug)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { title: `${SITE} — clube do livro` } },
    {
      path: '/resenhas',
      name: 'reviews',
      component: () => import('@/views/ReviewsView.vue'),
      meta: { title: `${reviewsPage.title} — ${SITE}` },
    },
    {
      path: '/resenhas/:slug',
      name: 'review',
      component: () => import('@/views/ReviewView.vue'),
      props: true,
      beforeEnter: (to) => (findPost(to.params.slug) ? true : { name: 'reviews' }),
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    // Wait a frame so the target section exists after a page change.
    if (to.hash) {
      return new Promise((resolve) =>
        requestAnimationFrame(() => resolve({ el: to.hash, behavior: 'smooth' })),
      )
    }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const post = findPost(to.params.slug)
  document.title = post ? `${post.title} — ${SITE}` : ((to.meta.title as string) ?? SITE)
})

export default router

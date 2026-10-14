// Loads the JSON files in src/content and hands typed data to the pages.
// The JSONs are bundled at build time, so editing one needs a rebuild/redeploy.
// Content is checked before every build by scripts/validar-conteudo.ts; the review
// check below repeats it at runtime so `npm run dev` also shows the problem.

import type {
  Book,
  BookOfMonth,
  HomePage,
  Meeting,
  Post,
  PostFile,
  ReviewsPage,
  Site,
  Testimonial,
} from '@/types/content'

import { validatePost } from '@/data/validate'

import siteJson from '@/content/site.json'
import homeJson from '@/content/paginas/inicio.json'
import reviewsJson from '@/content/paginas/resenhas.json'
import bookOfMonthJson from '@/content/livro-do-mes.json'
import booksJson from '@/content/estante.json'
import testimonialsJson from '@/content/depoimentos.json'
import meetingsJson from '@/content/encontros.json'

export const site: Site = siteJson
export const homePage: HomePage = homeJson
export const reviewsPage: ReviewsPage = reviewsJson
export const bookOfTheMonth: BookOfMonth = bookOfMonthJson
export const books: Book[] = booksJson
export const testimonials: Testimonial[] = testimonialsJson
export const meetings: Meeting[] = meetingsJson

// --- Reviews: one file per review in src/content/resenhas ---

const postFiles = import.meta.glob<PostFile>('@/content/resenhas/*.json', {
  eager: true,
  import: 'default',
})

const sortedPosts = Object.entries(postFiles)
  .map(([path, data]) => {
    const slug = path.split('/').pop()!.replace(/\.json$/, '')
    const errors = validatePost(slug, data as unknown as Record<string, unknown>, reviewsPage.categories)
    if (errors.length) throw new Error(`[conteúdo] resenhas/${slug}.json: ${errors.join('; ')}`)
    return { ...data, image: data.image ?? '', slug }
  })
  // Newest first
  .sort((a, b) => b.date.localeCompare(a.date))

export const posts: Post[] = sortedPosts.map((p, i) => ({ ...p, issue: sortedPosts.length - i }))

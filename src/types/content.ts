// Shapes of the JSON files in src/content. See src/content/README.md.

export interface Site {
  name: string
  description: string
  instagramUrl: string
  copyright: string
}

export interface Stat {
  value: string
  label: string
}

export interface HomePage {
  hero: {
    title: string
    text: string
    primaryButton: string
    secondaryLink: string
    image: string
    imageAlt: string
  }
  about: { title: string; paragraphs: string[]; stats: Stat[] }
  bookshelf: { title: string; text: string }
  testimonials: { title: string }
  blog: { title: string; link: string }
  meetings: { title: string; text: string }
  join: { title: string; text: string; button: string }
}

export interface ReviewsPage {
  title: string
  text: string
  categories: string[]
  allLabel: string
  join: { title: string; button: string }
  letter: {
    greeting: string
    signoff: string
    subscribeTitle: string
    subscribeText: string
    subscribeButton: string
    moreTitle: string
  }
}

export interface BookOfMonth {
  title: string
  author: string
  synopsis: string
  /** "AAAA-MM-DDTHH:MM" */
  meetingDate: string
  pages: number
  format: string
  /** Optional image path in /public, e.g. "/images/capas/livro.webp" */
  cover: string
}

export interface Book {
  title: string
  author: string
  /** "AAAA-MM" */
  readIn: string
  phrase: string
  color: string
  cover: string
}

export interface Testimonial {
  name: string
  memberSince: number
  quote: string
}

export interface Meeting {
  /** "AAAA-MM" */
  date: string
  place: string
  title: string
  text: string
  photos: string[]
}

/** One file in src/content/resenhas */
export interface PostFile {
  title: string
  category: string
  author: string
  /** "AAAA-MM-DD" */
  date: string
  excerpt: string
  image: string
  book: { title: string; author: string }
  quote: string
  body: string[]
}

export interface Post extends PostFile {
  /** File name without .json; used in the URL */
  slug: string
  /** Newsletter issue number; the oldest post is nº 1 */
  issue: number
}

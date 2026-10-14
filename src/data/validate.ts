// Content rules shared by the site (src/data/content.ts) and the pre-build check
// (scripts/validar-conteudo.ts). Keep this file free of "@/" imports so Node can run it.

type Json = Record<string, unknown>

const DAY = /^\d{4}-\d{2}-\d{2}$/
const MONTH = /^\d{4}-\d{2}$/
const DATETIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/
const SLUG = /^[a-z0-9-]+$/

const isText = (v: unknown) => typeof v === 'string' && v.trim() !== ''
const isTextList = (v: unknown) => Array.isArray(v) && v.length > 0 && v.every(isText)

function requireText(data: Json, fields: string[], errors: string[]) {
  for (const f of fields) if (!isText(data[f])) errors.push(`campo "${f}" vazio ou faltando`)
}

function requireDate(data: Json, field: string, pattern: RegExp, format: string, errors: string[]) {
  const v = data[field]
  if (typeof v !== 'string' || !pattern.test(v)) errors.push(`"${field}" deve ser ${format}, veio ${JSON.stringify(v)}`)
}

/** One file in src/content/resenhas. Returns the problems found (empty = ok). */
export function validatePost(slug: string, data: Json, categories: string[]): string[] {
  const errors: string[] = []
  if (!SLUG.test(slug)) errors.push('o nome do arquivo deve ter só letras minúsculas, números e hífens')
  requireText(data, ['title', 'category', 'author', 'excerpt', 'quote'], errors)
  requireDate(data, 'date', DAY, 'AAAA-MM-DD', errors)
  if (isText(data.category) && !categories.includes(data.category as string)) {
    errors.push(`"category" deve ser uma de: ${categories.join(', ')}; veio "${data.category}"`)
  }
  const book = data.book as Json | undefined
  if (!book || !isText(book.title) || !isText(book.author)) errors.push('"book" precisa de "title" e "author"')
  if (!isTextList(data.body)) errors.push('"body" precisa ser uma lista com pelo menos um parágrafo')
  if (data.image !== undefined && typeof data.image !== 'string') errors.push('"image" deve ser um texto (pode ser "")')
  return errors
}

/** One entry of src/content/estante.json */
export function validateBook(data: Json): string[] {
  const errors: string[] = []
  requireText(data, ['title', 'author', 'phrase', 'color'], errors)
  requireDate(data, 'readIn', MONTH, 'AAAA-MM', errors)
  return errors
}

/** One entry of src/content/encontros.json */
export function validateMeeting(data: Json): string[] {
  const errors: string[] = []
  requireText(data, ['place', 'title', 'text'], errors)
  requireDate(data, 'date', MONTH, 'AAAA-MM', errors)
  if (!Array.isArray(data.photos)) errors.push('"photos" deve ser uma lista (pode ser [])')
  return errors
}

/** src/content/livro-do-mes.json */
export function validateBookOfMonth(data: Json): string[] {
  const errors: string[] = []
  requireText(data, ['title', 'author', 'synopsis', 'format'], errors)
  requireDate(data, 'meetingDate', DATETIME, 'AAAA-MM-DDTHH:MM', errors)
  if (typeof data.pages !== 'number') errors.push('"pages" deve ser um número, sem aspas')
  return errors
}

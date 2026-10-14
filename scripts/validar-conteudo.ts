// Checks every JSON in src/content before a build (npm run validar / npm run build).
// Prints each problem with its file name and exits with an error if anything is wrong.

import { readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import {
  validateBook,
  validateBookOfMonth,
  validateMeeting,
  validatePost,
} from '../src/data/validate.ts'

type Json = Record<string, unknown>

const ROOT = join(import.meta.dirname, '..', 'src', 'content')
const problems: string[] = []

function read(file: string): unknown {
  const path = join(ROOT, file)
  try {
    return JSON.parse(readFileSync(path, 'utf8'))
  } catch (e) {
    const reason = e instanceof SyntaxError ? `JSON inválido (${e.message})` : 'arquivo não encontrado'
    problems.push(`${relative(process.cwd(), path)}: ${reason}`)
    return undefined
  }
}

function report(file: string, errors: string[], label = '') {
  for (const err of errors) problems.push(`src/content/${file}${label}: ${err}`)
}

function checkList(file: string, check: (item: Json) => string[]) {
  const list = read(file)
  if (list === undefined) return
  if (!Array.isArray(list)) return report(file, ['deve ser uma lista [ ... ]'])
  list.forEach((item, i) => report(file, check(item as Json), ` (item ${i + 1})`))
}

// Single files only need to exist and parse; their shape is checked by vue-tsc.
read('site.json')
read('paginas/inicio.json')
read('depoimentos.json')
const reviewsPage = read('paginas/resenhas.json') as { categories?: string[] } | undefined

const bookOfMonth = read('livro-do-mes.json')
if (bookOfMonth) report('livro-do-mes.json', validateBookOfMonth(bookOfMonth as Json))

checkList('estante.json', validateBook)
checkList('encontros.json', validateMeeting)

const categories = reviewsPage?.categories ?? []
const postFiles = readdirSync(join(ROOT, 'resenhas')).filter((f) => f.endsWith('.json'))
if (postFiles.length === 0) problems.push('src/content/resenhas: nenhuma resenha encontrada')
for (const file of postFiles) {
  const data = read(join('resenhas', file))
  if (data) report(join('resenhas', file), validatePost(file.replace(/\.json$/, ''), data as Json, categories))
}

if (problems.length) {
  console.error(`\n✗ Conteúdo com problemas (${problems.length}):\n`)
  for (const p of problems) console.error(`  • ${p}`)
  console.error('\nVeja src/content/README.md para o formato de cada arquivo.\n')
  process.exit(1)
}
console.log(`✓ Conteúdo ok (${postFiles.length} resenhas)`)

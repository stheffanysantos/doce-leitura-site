# Conteúdo do site

Todo o texto do site vem dos arquivos JSON desta pasta. Não é preciso mexer em código para atualizar o conteúdo.

```
src/content/
├── site.json              # nome, Instagram, rodapé
├── paginas/
│   ├── inicio.json        # textos fixos da página inicial
│   └── resenhas.json      # textos da lista e da página de cada resenha, categorias
├── livro-do-mes.json      # o livro do mês atual
├── estante.json           # livros já lidos (lista)
├── depoimentos.json       # depoimentos de membros (lista)
├── encontros.json         # encontros passados (lista)
└── resenhas/              # uma resenha por arquivo
    └── nome-da-resenha.json
```

As imagens ficam em `public/images/` e são referenciadas pelo caminho a partir de `/images/...`:

```
public/images/
├── resenhas/    # imagens das resenhas
├── encontros/   # fotos dos encontros
└── capas/       # capas de livros
```

Todo campo de imagem é opcional. Se ficar vazio (`""` ou `[]`), o site mostra o espaço listrado no lugar.

## Depois de editar

1. Rode `npm run validar` para conferir se está tudo certo. O mesmo teste roda sozinho antes de todo `npm run build`.
2. Se houver um problema, a mensagem diz o arquivo e o campo. Exemplo:
   ```
   • src/content/resenhas/minha-resenha.json: "date" deve ser AAAA-MM-DD, veio "02/07/2026"
   ```
3. Publique o site de novo. O conteúdo vai junto no build, então uma alteração só aparece depois de um novo deploy.

## Formato das datas

| Formato | Exemplo | Onde |
|---|---|---|
| `AAAA-MM-DD` | `"2026-07-02"` | data da resenha |
| `AAAA-MM` | `"2026-06"` | estante (`readIn`) e encontros (`date`) |
| `AAAA-MM-DDTHH:MM` | `"2026-07-27T19:00"` | encontro do livro do mês |

O site transforma as datas sozinho: `"2026-07-02"` vira "2 jul", `"2026-06"` vira "Junho 2026" e `"2026-07-27T19:00"` vira "27 de julho, 19h".

## Publicar uma resenha nova

Crie um arquivo em `resenhas/`. **O nome do arquivo vira o endereço da página**, então use só letras minúsculas, números e hífens, sem acentos:

`resenhas/o-avesso-da-pele.json` → `/resenhas/o-avesso-da-pele`

```json
{
  "title": "O Avesso da Pele e o que não se diz",
  "category": "Resenha",
  "author": "Renata Alves",
  "date": "2026-08-05",
  "excerpt": "Uma frase curta que aparece nos cards e no topo da resenha.",
  "image": "/images/resenhas/o-avesso-da-pele.webp",
  "book": {
    "title": "O Avesso da Pele",
    "author": "Jeferson Tenório"
  },
  "quote": "A frase de destaque que aparece no meio da carta.",
  "body": [
    "Primeiro parágrafo.",
    "Segundo parágrafo.",
    "Cada item da lista é um parágrafo."
  ]
}
```

- `category` precisa ser uma das categorias listadas em `paginas/resenhas.json` (`"categories"`). Para criar uma categoria nova, adicione-a lá primeiro. Ela vira um botão de filtro na lista.
- As resenhas são ordenadas pela data, da mais nova para a mais antiga. A mais recente aparece em destaque e na página inicial.
- O **número da carta** ("Carta nº 6") e o **tempo de leitura** são calculados sozinhos, pela ordem das datas e pela quantidade de palavras do `body`.
- As iniciais do avatar saem do nome em `author`.

## Livro do mês (`livro-do-mes.json`)

```json
{
  "title": "A Sombra do Vento",
  "author": "Carlos Ruiz Zafón",
  "synopsis": "Resumo do livro.",
  "meetingDate": "2026-07-27T19:00",
  "pages": 487,
  "format": "Presencial + online",
  "cover": ""
}
```

O mês ("Livro de julho") sai da data do encontro. `pages` é um número, sem aspas.

## Estante (`estante.json`)

Cada livro já lido é um item da lista, e a ordem do arquivo é a ordem na tela.

```json
{
  "title": "Torto Arado",
  "author": "Itamar Vieira Junior",
  "readIn": "2026-03",
  "phrase": "a frase que resume a discussão",
  "color": "#c0e7e8",
  "cover": ""
}
```

`color` é a cor da capa desenhada, em hexadecimal. Ela só é usada quando `cover` está vazio.

## Encontros (`encontros.json`)

```json
{
  "date": "2026-06",
  "place": "Café Livraria",
  "title": "Circe e a noite dos mitos",
  "text": "O que aconteceu no encontro.",
  "photos": [
    "/images/encontros/2026-06-1.webp",
    "/images/encontros/2026-06-2.webp"
  ]
}
```

As fotos passam sozinhas no card, uma de cada vez. Com `"photos": []`, aparecem 3 espaços listrados.

## Depoimentos (`depoimentos.json`)

```json
{
  "name": "Camila Nogueira",
  "memberSince": 2021,
  "quote": "O depoimento."
}
```

`memberSince` é um número, sem aspas, e aparece como "membro desde 2021".

## Textos fixos

- `site.json`: link do Instagram, usado em todos os botões, e o texto do rodapé.
- `paginas/inicio.json`: títulos e textos de cada seção da página inicial, os números do "Sobre" e a foto do topo.
- `paginas/resenhas.json`: título da lista de resenhas, categorias, saudação e despedida das cartas ("Olá, pessoal do clube," / "Com carinho,") e o bloco de inscrição.

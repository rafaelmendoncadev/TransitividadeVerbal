# Portal da Transitividade Verbal

Site educacional sobre transitividade verbal, com teoria aprofundada, quiz interativo e gabarito desbloqueável.

**Design:** [Stitch](https://stitch.withgoogle.com) — projeto *Portal da Transitividade Verbal* (Gramática Pro).  
**Conteúdo:** material do Professor Eiter (`Transitividade_Verbal.md`).

## Requisitos

- Node.js 14+
- npm

## Instalação e execução

```bash
npm install
npm start
```

Abra [http://localhost:3000](http://localhost:3000).

## Deploy na Vercel

O projeto é uma aplicação Express com detecção automática pela Vercel (zero configuration). O arquivo `app.js` exporta a instância do Express e os assets estáticos ficam em `public/`.

### Via Git (recomendado)

1. Envie o repositório para GitHub, GitLab ou Bitbucket.
2. Acesse [vercel.com/new](https://vercel.com/new) e importe o repositório.
3. A Vercel detecta Express automaticamente — não é necessário comando de build nem diretório de saída.
4. Clique em **Deploy**.

### Via CLI

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # produção
```

Para simular o ambiente da Vercel localmente:

```bash
vercel dev
```

### Notas

- Arquivos em `public/` são servidos pela CDN da Vercel (CSS, JS).
- Rotas dinâmicas (`/`, `/api/quiz`, etc.) são tratadas pelo Express em serverless.
- Não há variáveis de ambiente obrigatórias para este projeto.

## Funcionalidades

1. **Teoria** — VTD, VTI, VTDI, VI, VL, complementos, preposições e dicas práticas.
2. **Exercícios** — 5 questões aleatórias por tentativa, com correção automática e explicações detalhadas.
3. **Gabarito** — desbloqueado após acertar as 5 questões sem nenhum erro (Exercícios 1 e 2 do PDF).

## Estrutura

```
data/questions.js    # Banco de 25 perguntas
data/gabarito.js     # Gabarito dos exercícios do PDF
routes/api.js        # API do quiz
public/javascripts/quiz.js
views/               # Templates Pug
stitch/              # Referência visual do design Stitch
```

## API

- `GET /api/quiz?count=5` — retorna perguntas aleatórias (sem respostas).
- `POST /api/quiz/check` — body: `{ "answers": [{ "id", "selected" }] }` — retorna correção e gabarito se 5/5.

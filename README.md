# Insider Guard

Insider Guard is a React + TypeScript dashboard for insider threat detection workflows using an enhanced Test-Time Training (TTT) approach.

## Getting started

Requirements:

- Node.js 18+
- npm 9+

Install dependencies:

```sh
npm install
```

Start development server:

```sh
npm run dev
```

Build for production:

```sh
npm run build
```

Run tests:

```sh
npm run test
```

Run lint:

```sh
npm run lint
```

## Tech stack

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Vitest

## Deploy on Render

This repo includes a Render blueprint config in render.yaml.

Option 1 (recommended): Blueprint deploy

1. Push this project to GitHub.
2. In Render, click New + and select Blueprint.
3. Connect your repo and deploy.

Option 2: Manual Static Site deploy

- Build Command: npm install && npm run build
- Publish Directory: dist

For SPA routing, add a rewrite rule on Render:

- Source: /*
- Destination: /index.html
- Action: Rewrite

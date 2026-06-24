# Vatsal Naik — Portfolio

A single-page React portfolio built with [Vite](https://vitejs.dev/) and [Tailwind CSS v4](https://tailwindcss.com/).

## Stack

- **React 19**
- **Vite** (build tooling + dev server)
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **lucide-react** (icons)
- Google Fonts: Big Shoulders Display, Inter, IBM Plex Mono (loaded in `index.html`)

## Local development

```bash
npm install
npm run dev      # start dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

## Deployment

Deployed on [Vercel](https://vercel.com). Vercel auto-detects the Vite preset:

- **Build command:** `vite build`
- **Output directory:** `dist`

Every push to `main` triggers a new deployment.

## Project structure

```
index.html        # HTML entry + Google Fonts <link>s
src/
  main.jsx        # React entry point
  App.jsx         # full portfolio UI (single component file)
  index.css       # Tailwind import
vite.config.js    # Vite + React + Tailwind plugins
```

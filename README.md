# Art History Study App

A local-first, study-focused React app for memorizing artworks by **exam category** without spoiling the answer on the front of the card.

## Study philosophy

This app is built for recall practice:

- **Front of card stays spoiler-free**: image, title, artist, and year only
- **Flip/reveal shows the answer**: exam category, movement/style, type of work, visual clues, themes, and significance
- **Study flow follows your exam outline** via `examCategory`, not generic front-side style tags

## Core features

- **Flashcards** with flip, shuffle, progress, and review/confident markers
- **Quiz mode** with reveal flow, self-rating, and missed-cards-only review
- **Category browser** for navigating artworks by exam bucket
- **Study this category only** mode that preserves next/previous and shuffle within the selected category
- **Compare mode** for side-by-side review
- **Cram sheet** grouped by exam category
- **Search + filter** by title, artist, exam category, or movement/style
- **Local persistence** with `localStorage`
- **Keyboard shortcuts**: `Space` = flip/reveal, `←` / `→` = navigate, `S` = shuffle

## Tech stack

- React 18
- TypeScript
- Vite
- Tailwind CSS

## Getting started

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Build

```bash
npm run build
```

## GitHub Pages

This repo is configured for GitHub Pages deployment from the `main` branch via GitHub Actions.

Expected production URL:

```
https://nbui23.github.io/art-history-study-app/
```

Because the site is deployed under a repository subpath, the Vite base path and image URLs are configured to work correctly on Pages.

## Data model

Canonical artwork data lives in `src/data/artworks.ts`.

Each artwork includes:

- `examCategory`
- `movementStyle`
- `typeOfWork`
- `visualClues`
- `importanceToMovement`
- `importanceToArtHistory`
- `mainReasonsImportant`
- `themes`
- `memoryHook`
- image metadata (`imageSlug`, `imageExtension`) used to derive the final image path

### Important rule

`examCategory` is the main study grouping. If a work is missing a category assignment, leave a clear TODO in the data instead of guessing.

## Images

Artwork images are served from `public/images/`.

When adding or replacing an image:

1. Put the file in `public/images/`
2. Use a lowercase kebab-case filename
3. Update the corresponding `imageSlug` / `imageExtension` in `src/data/artworks.ts`

Example:

```ts
imageSlug: 'francisco-goya-the-third-of-may-1808',
imageExtension: 'jpg'
```

The app derives the final `image` path automatically.

## Adding artworks

Add new entries directly in `src/data/artworks.ts` using the existing shape:

```ts
{
  id: 'unique-id',
  artist: 'Artist Name',
  title: 'Artwork Title',
  year: 'Year or date range',
  examCategory: 'Exam outline bucket',
  movementStyle: 'Movement / style',
  typeOfWork: 'Oil on canvas / installation / etc.',
  importanceToMovement: 'Why it matters to the movement.',
  importanceToArtHistory: 'Why it matters more broadly in art history.',
  mainReasonsImportant: ['reason 1', 'reason 2'],
  visualClues: ['clue 1', 'clue 2'],
  themes: ['theme 1', 'theme 2'],
  memoryHook: 'Short study hook.',
  imageSlug: 'artist-artwork-title',
  imageExtension: 'jpg'
}
```

## Project structure

- `src/data/artworks.ts` — canonical artwork content
- `src/components/` — flashcards, quiz, category browser, compare, cram sheet
- `public/images/` — local artwork images

## Notes

- The app is intentionally simple and study-focused
- Image paths are preserved from the canonical data source
- The UI avoids revealing category/movement/type on the flashcard front

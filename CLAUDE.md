# CLAUDE.md — kevintame.co

This file documents the codebase structure, conventions, and development workflows for AI assistants working in this repository.

## Project Overview

**kevintame.co** is Kevin Tame's personal portfolio and blog website. It is built on a Tailwind UI commercial template ("Spotlight") and customized for his personal brand. The site showcases his work history, projects, articles, and tools.

- **Live URL:** https://kevintame.co
- **Deployment:** Vercel (auto-deploys on push to `master`)
- **Node version:** 18.20 (see `.nvmrc`)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (Pages Router) |
| UI Library | React 18 |
| Styling | Tailwind CSS 3 + @tailwindcss/typography |
| Content | MDX via @next/mdx + @mdx-js/react |
| Markdown plugins | remark-gfm (GFM), rehype-prism (syntax highlighting) |
| Headless UI | @headlessui/react |
| Utilities | clsx, fast-glob, feed |
| Linting | ESLint (next/core-web-vitals) |
| Formatting | Prettier 3 + prettier-plugin-tailwindcss |

---

## Directory Structure

```
kevintame.co/
├── src/
│   ├── components/          # Reusable React components
│   ├── pages/               # Next.js routes (Pages Router)
│   │   ├── _app.jsx         # App shell: Header + Footer + global styles
│   │   ├── _document.jsx    # Document with dark mode init script
│   │   ├── index.jsx        # Homepage (resume/work history)
│   │   ├── about.jsx        # About / bio page
│   │   ├── projects.jsx     # Projects showcase
│   │   ├── tools.jsx        # Tools page
│   │   ├── thank-you.jsx    # Post-form redirect page
│   │   └── articles/
│   │       ├── index.jsx    # Article listing page
│   │       └── <slug>/index.mdx  # Individual article files
│   ├── lib/                 # Utility functions
│   │   ├── getAllArticles.js      # Reads + sorts all MDX articles
│   │   ├── formatDate.js         # Date formatting helper
│   │   └── generateRssFeed.js    # RSS feed generation (production only)
│   ├── images/              # Static images (avatar, portraits, logos, photos)
│   └── styles/
│       ├── tailwind.css     # Tailwind base + component + utilities
│       └── prism.css        # Syntax highlighting theme
├── public/
│   ├── robots.txt
│   ├── site.webmanifest
│   ├── favicon*.png / *.ico
│   └── resume/              # PDF resume file
├── next.config.mjs          # MDX + Next.js configuration
├── tailwind.config.js       # Tailwind theme + typography config
├── jsconfig.json            # Path aliases (@/ → src/)
├── .prettierrc              # Prettier rules
├── .eslintrc.json           # ESLint config
├── .env.example             # Environment variable template
└── .nvmrc                   # Node version (18.20)
```

---

## Development Commands

```bash
npm run dev     # Start development server (http://localhost:3000)
npm run build   # Production build
npm run start   # Serve production build locally
npm run lint    # Run ESLint
```

There is **no test runner** configured. There are no `*.test.*` or `*.spec.*` files.

---

## Environment Variables

Create a `.env.local` file (gitignored) based on `.env.example`:

```
NEXT_PUBLIC_SITE_URL=https://kevintame.co
```

This variable is used in:
- `src/lib/generateRssFeed.js` — for feed links
- `src/_document.jsx` — referenced for meta/canonical URLs

---

## Code Conventions

### Formatting (enforced by Prettier)
- **Single quotes** for strings
- **No semicolons**
- **Tailwind class sorting** is automatic via `prettier-plugin-tailwindcss`
- Run `npx prettier --write .` before committing if classes look unsorted

### Naming
- **Components:** PascalCase files matching component name (e.g., `ArticleLayout.jsx`)
- **Utilities:** camelCase (e.g., `getAllArticles.js`, `formatDate.js`)
- **Icons/SVGs:** PascalCase constant names inside component files (e.g., `TwitterIcon`, `GitHubIcon`)

### Imports
- Use the `@/` alias (maps to `src/`) for all internal imports:
  ```js
  import { ArticleLayout } from '@/components/ArticleLayout'
  import { getAllArticles } from '@/lib/getAllArticles'
  ```
- Next.js built-ins: `next/link`, `next/image`, `next/head`, `next/router`
- Use `clsx` for conditional class names, never template literals for classes

### Styling
- **Tailwind utility classes only** — no CSS Modules, no inline styles
- Dark mode is **class-based** (`dark:` prefix). The `dark` class is added to `<html>` by an inline script in `_document.jsx` that checks `localStorage` and `prefers-color-scheme`
- Color palette: **zinc** for neutral tones, **purple** for accent/CTA
- Responsive breakpoints: `sm:`, `md:`, `lg:`, `xl:` (mobile-first)

### Component Patterns

**Standard component:**
```jsx
export function MyComponent({ className, ...props }) {
  return <div className={clsx('base-classes', className)} {...props} />
}
```

**Compound components** (e.g., `Card`):
```jsx
Card.Link = function CardLink({ ...props }) { ... }
Card.Title = function CardTitle({ ...props }) { ... }
Card.Description = function CardDescription({ ...props }) { ... }
Card.Cta = function CardCta({ ...props }) { ... }
```

**forwardRef** is used on container-type components (see `Container` in `Container.jsx`).

---

## Adding New Articles

Articles live at `src/pages/articles/<slug>/index.mdx`. Each file must export a `meta` object and a default layout:

```mdx
import { ArticleLayout } from '@/components/ArticleLayout'

export const meta = {
  author: 'Kevin Tame',
  date: 'YYYY-MM-DD',       // ISO date, used for sorting
  title: 'Article Title',
  description: 'One-sentence summary shown in the article list.',
}

export default (props) => <ArticleLayout meta={meta} {...props} />

Article content in standard Markdown / MDX goes here...
```

- Articles are **auto-discovered** by `getAllArticles.js` via `fast-glob`
- They are **sorted descending by date** automatically
- MDX supports GitHub Flavored Markdown (tables, strikethrough, etc.) and syntax-highlighted code blocks via Prism

---

## Adding New Pages

1. Create a `.jsx` file in `src/pages/` — Next.js Pages Router handles routing automatically
2. Use `<SimpleLayout>` for standard content pages or `<Container>` for custom layouts
3. Include `<Head>` (from `next/head`) with `title` and `description` meta tags
4. For pages that need data at build time, export `getStaticProps`

---

## Key Components Reference

| Component | File | Purpose |
|---|---|---|
| `Header` | `src/components/Header.jsx` | Site navigation + dark mode toggle |
| `Footer` | `src/components/Footer.jsx` | Site-wide footer with nav links |
| `Container` | `src/components/Container.jsx` | Centered layout wrapper (Outer + Inner) |
| `SimpleLayout` | `src/components/SimpleLayout.jsx` | Page layout with title + intro |
| `ArticleLayout` | `src/components/ArticleLayout.jsx` | Wrapper for MDX article pages |
| `Prose` | `src/components/Prose.jsx` | Applies Tailwind typography prose styles |
| `Card` | `src/components/Card.jsx` | Compound card component for listings |
| `Button` | `src/components/Button.jsx` | Styled button (primary/secondary variants) |
| `Section` | `src/components/Section.jsx` | Section layout with optional title |
| `SocialIcons` | `src/components/SocialIcons.jsx` | SVG icons for social media links |

---

## Next.js Configuration Notes

- **Page extensions:** `.js`, `.jsx`, `.mdx` — all three are valid page files
- **React Strict Mode** is enabled
- MDX is processed through `@next/mdx` with:
  - `remark-gfm` for GitHub Flavored Markdown
  - `@mapbox/rehype-prism` for syntax highlighting in code blocks
- The `@/` path alias is configured via `jsconfig.json` (not `tsconfig.json` — this is a JS project)

---

## RSS Feed

The RSS feed is generated in `src/lib/generateRssFeed.js` and only runs during production builds (`NODE_ENV === 'production'`). It writes to `public/rss/feed.xml` and `public/rss/feed.json`. The feed URL base comes from `NEXT_PUBLIC_SITE_URL`.

---

## Git Workflow

- **Production branch:** `master` → auto-deploys to Vercel
- **Feature branches:** Use descriptive names; `claude/` prefix for AI-assisted branches
- **No CI/CD pipeline** is configured — Vercel handles builds on push

---

## Known Notes

- Resume PDF at `public/resume/` may be outdated — update when Kevin provides a new version
- No test suite exists; validate changes by running `npm run build` and checking for lint/build errors
- The project originated from a **Tailwind UI commercial template** (Spotlight) — the `LICENSE.md` governs usage

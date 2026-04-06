# Ljubo Hub

Personal monorepo containing two Next.js 15 applications — a personal blog and a link hub.

| App                | Description                                                                                 | URL                                    |
| ------------------ | ------------------------------------------------------------------------------------------- | -------------------------------------- |
| **[Blog](./blog)** | MDX-powered personal blog about software development, front-end tools, leadership, and more | [blog.ljubo.rs](https://blog.ljubo.rs) |
| **[Hub](./hub)**   | Config-driven Linktree-style personal hub with customizable themes                          | —                                      |

## Blog

A full-featured blog built with **Next.js 15**, **Contentlayer2**, and **Tailwind CSS**. Based on the [Tailwind Nextjs Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) by Timothy Lin.

**Key features:**

- MDX content with reading time, table of contents, and multiple layouts
- KBar client-side search
- Giscus comments (GitHub Discussions)
- Dark / Light / System theme
- Tag system with auto-generated counts
- KaTeX math rendering
- Prism code syntax highlighting
- BibTeX citation support
- RSS feed generation
- SEO with OpenGraph, Twitter cards, JSON-LD, sitemap, and robots.txt
- Google Analytics and ConvertKit newsletter integration
- Security headers (CSP, HSTS, X-Frame-Options, etc.)

```bash
cd blog
yarn install
yarn dev        # Start dev server
yarn build      # Production build + RSS generation
```

## Hub

A config-driven one-pager built with **Next.js 15**, **Tailwind CSS**, and **Radix UI / shadcn** components. All profile data and theme settings are driven by a single `data.json` file.

**Key features:**

- Fully customizable theming (color, gradient, pattern, font, border radius, glassmorphism, animations)
- Dark / Light / System theme
- Radix UI primitives with shadcn/ui patterns
- Google Analytics

```bash
cd hub
pnpm install
pnpm dev        # Start dev server
pnpm build      # Production build
```

## Tech Stack

|                 | Blog                | Hub            |
| --------------- | ------------------- | -------------- |
| Framework       | Next.js 15          | Next.js 15     |
| Language        | TypeScript          | TypeScript     |
| Styling         | Tailwind CSS 3      | Tailwind CSS 3 |
| Content         | MDX (Contentlayer2) | JSON config    |
| Package Manager | Yarn                | pnpm           |

## License

Blog is [MIT licensed](./blog/LICENSE) (based on Timothy Lin's starter).

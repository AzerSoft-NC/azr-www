# Azer Soft Website v3

Astro-based company website (v3), rebuilt from scratch from Astro-Rocket base.

## Stack

- Astro 6
- Tailwind CSS v4
- Static output (`dist/`)
- Nginx on DigitalOcean droplet
- Deployment target: droplet only (no Vercel/Netlify/Cloudflare config)

## Project Structure

- `src/pages/index.astro`: homepage sections (hero, services, clients, contact)
- `src/pages/blog/`: blog listing and post routes
- `src/content/blog/fr/`: French blog posts
- `src/config/site.config.ts`: branding, SEO, company metadata
- `src/config/nav.config.ts`: top navigation
- `deploy/`: Nginx config and deploy scripts
- `.old/`: archived old v1/v2 website files (gitignored)
- `new_content/`: source assets provided by client

## Local Development

Yarn 4 is pinned via `packageManager` in `package.json`. Enable Corepack once (Node ≥16.10) so the correct Yarn version is used:

```bash
corepack enable
yarn install
yarn dev
```

## Build

```bash
yarn build
```

Output goes to `dist/`.

## Deploy

Use `deploy/README.md` for droplet setup.

Quick deploy after setup:

```bash
./deploy/deploy.sh user@droplet
```

Optional:

- `deploy/nginx.conf`: repo nginx baseline config
- `deploy/current-nginx.conf`: snapshot of current server config

## Content Editing Map

- Hero wording and CTA: `src/pages/index.astro`
- Services / competences / clients: `src/pages/index.astro`
- Contact info: `src/pages/index.astro` + `src/config/site.config.ts`
- Blog posts: add `.mdx` files in `src/content/blog/fr/`
- SEO defaults: `src/config/site.config.ts`

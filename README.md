# Azer Soft Website v3

Astro-based company website (v3), rebuilt from scratch from Astro-Rocket base.

## Stack

- Astro 6
- Tailwind CSS v4
- Static output (`dist/`)
- Nginx on DigitalOcean droplet
- Deployment target: droplet only

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

pnpm is pinned via `packageManager` in `package.json`. Enable Corepack once (Node ≥16.10) so the correct pnpm version is used:

```bash
corepack enable
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

Output goes to `dist/`.

## Contact form / mailer

The contact form posts **JSON** from the browser to a public HTTP endpoint (no secrets in the static site). Set at build time:

- **`PUBLIC_MAILER_ENDPOINT`** — full URL of the mailer route (for example `https://apps.azersoft.nc/mail/forms/azersoft-contact` once your reverse proxy is configured).

Payload fields: `name`, `email`, `subject`, `message`, `honeypot` (empty for humans). The UI expects JSON responses shaped like `{ "success": true }` or `{ "success": false, "errors": { "field": ["…"] } }`.

Service implementation, CORS, rate limits, and SMTP live in the **[azr-mailer](https://github.com/azersoft/azr-mailer)** repository.

## Deploy

Use `deploy/README.md` for droplet setup.

Quick deploy after setup:

```bash
./deploy/deploy.sh
```

## Content Editing Map

- Hero wording and CTA: `src/pages/index.astro`
- Services / competences / clients: `src/pages/index.astro`
- Contact info: `src/pages/index.astro` + `src/config/site.config.ts`
- Blog posts: add `.mdx` files in `src/content/blog/fr/`
- SEO defaults: `src/config/site.config.ts`

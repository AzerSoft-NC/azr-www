# Deployment (DigitalOcean + Nginx)

## 1) Prepare droplet

```bash
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx rsync
```

Create web root:

```bash
sudo mkdir -p /var/www/azersoft
sudo chown -R $USER:$USER /var/www/azersoft
```

## 2) Install nginx site config

```bash
sudo cp deploy/nginx.conf /etc/nginx/sites-available/azersoft
sudo ln -sf /etc/nginx/sites-available/azersoft /etc/nginx/sites-enabled/azersoft
sudo nginx -t
sudo systemctl reload nginx
```

## 3) Issue TLS certificate

```bash
sudo certbot --nginx -d azersoft.nc -d www.azersoft.nc
```

## 4) Configure local deploy settings

```bash
cp .deploy.example .deploy
```

Edit `.deploy` with your SSH target (keys via `~/.ssh`, not passwords in this file):

```bash
DEPLOY_SSH_TARGET=user@your-droplet-ip
# DEPLOY_REMOTE_PATH=/var/www/azersoft
```

`.deploy` is gitignored.

## 5) Full deploy pipeline

From the project root:

```bash
chmod +x deploy/*.sh
./deploy/deploy.sh
```

### Pipeline order

| Step | Script | Action |
|------|--------|--------|
| 1 | `deploy-pre-check.sh` | Fail if uncommitted changes |
| 2 | `deploy-prettier.sh` | `yarn format:check` |
| 3 | `deploy-check.sh` | ESLint, `astro check`, Vitest |
| 4 | `deploy-release.sh` | Bump **patch** in `package.json` (`x.y.z` → `x.y.z+1`), commit, tag `v…`, push |
| 5 | — | `yarn build` → `dist/` |
| 6 | `deploy-droplet.sh` | `rsync` `dist/` to the droplet |

### Flags

- **`--minor`** — release bump **minor** (`x.y.z` → `x.(y+1).0`) instead of patch.
- **`--skip-release`** — skip step 4 (no version bump, no git commit/tag/push); still runs checks, build, rsync.

### Override SSH target

```bash
./deploy/deploy.sh user@other-host
```

CLI wins over `DEPLOY_SSH_TARGET` in `.deploy`.

### Checks only (no deploy)

```bash
yarn deploy:check
```

Same as steps 2+3 combined (`format:check`, lint, astro check, tests).

### Scripts under `scripts/deploy/`

Those files are **legacy** (Shopify/Docker); this site uses **`deploy/`** only.

## 6) Run individual steps

```bash
bash deploy/deploy-pre-check.sh
bash deploy/deploy-prettier.sh
bash deploy/deploy-check.sh
bash deploy/deploy-release.sh          # or: bash deploy/deploy-release.sh --minor
yarn build
bash deploy/deploy-droplet.sh          # optional: pass user@host as first arg
```

To auto-format before committing: `yarn format`, then commit so `deploy-pre-check.sh` passes.

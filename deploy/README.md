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

## 4) Deploy site

From local project root:

```bash
chmod +x deploy/deploy.sh
./deploy/deploy.sh user@your-droplet-ip
```

This builds static site and uploads `dist/` to `/var/www/azersoft`.

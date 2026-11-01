# syntax=docker/dockerfile:1

FROM node:22-alpine AS build
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.12.1 --activate

COPY package.json pnpm-lock.yaml .npmrc ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM nginx:alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

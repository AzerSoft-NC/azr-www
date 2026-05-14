# syntax=docker/dockerfile:1

FROM node:22-bookworm-slim AS builder
WORKDIR /app

RUN corepack enable && corepack prepare yarn@4.9.2 --activate

COPY package.json yarn.lock .yarnrc.yml ./
RUN yarn install --immutable

COPY . .

ARG SITE_URL
ENV SITE_URL=${SITE_URL}

RUN yarn build

FROM node:22-bookworm-slim AS runner
WORKDIR /app

RUN npm install -g serve@14.2.4

COPY --from=builder /app/dist ./dist

RUN chown -R node:node /app
USER node

ENV PORT=4321
EXPOSE 4321

CMD ["sh", "-c", "exec serve dist -l \"tcp://0.0.0.0:${PORT:-4321}\""]

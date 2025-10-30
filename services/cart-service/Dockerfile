# syntax=docker/dockerfile:1.6
# Multi-stage Dockerfile for NestJS + Prisma (cart-service)
FROM node:20-alpine AS deps
WORKDIR /app
ENV NPM_CONFIG_FUND=false \
    NPM_CONFIG_AUDIT=false
COPY package*.json ./
COPY package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --silent --no-audit --no-fund --prefer-offline

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY prisma ./prisma
COPY tsconfig*.json ./
COPY . .

# generate prisma client and build
RUN npx prisma generate || true
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# install only prod deps (in case native modules needed)
COPY package*.json ./
COPY package-lock.json ./

# copy built app and necessary runtime files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
RUN --mount=type=cache,target=/root/.npm npm prune --omit=dev --silent --no-audit --no-fund
COPY --from=builder /app/prisma ./prisma

# Create non-root user
RUN addgroup -S node >/dev/null 2>&1 || true; adduser -S node -G node >/dev/null 2>&1 || true
USER node

EXPOSE 3002
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD wget -qO- http://localhost:3002/ || exit 1
CMD ["sh", "-c", "npx prisma migrate deploy && (npx prisma db seed || true) && node dist/main"]

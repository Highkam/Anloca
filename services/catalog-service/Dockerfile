FROM node:20-alpine AS deps
WORKDIR /app
ENV NPM_CONFIG_FUND=false \
    NPM_CONFIG_AUDIT=false
COPY package*.json ./
COPY package-lock.json ./
RUN npm ci --silent

FROM node:20-alpine AS builder
WORKDIR /app
RUN apk add --no-cache openssl libc6-compat
COPY --from=deps /app/node_modules ./node_modules
COPY prisma ./prisma
COPY tsconfig*.json ./
COPY . .
RUN npm run build && npx prisma generate || true

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    PRISMA_CACHE_DIR=/tmp/prisma
RUN apk add --no-cache openssl libc6-compat
RUN apk add --no-cache openssl libc6-compat
COPY package*.json ./
COPY package-lock.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
RUN mkdir -p /tmp/prisma \
  && chown -R node:node /tmp/prisma /app /app/node_modules
RUN --mount=type=cache,target=/root/.npm npm prune --omit=dev --silent --no-audit --no-fund
RUN addgroup -S node >/dev/null 2>&1 || true; adduser -S node -G node >/dev/null 2>&1 || true
USER node

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD wget -qO- http://localhost:3000/ || exit 1
CMD ["sh", "-c", "npx prisma migrate deploy && (npx prisma db seed || true) && (node dist/main || node dist/src/main)"]

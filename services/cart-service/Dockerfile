# Multi-stage Dockerfile for NestJS + Prisma (cart-service)
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
COPY package-lock.json ./
RUN npm ci --omit=dev=false

FROM node:20-alpine AS builder
WORKDIR /app
# copy deps (to leverage cache)
COPY --from=deps /app/node_modules ./node_modules
# copy source and prisma schema
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
RUN npm ci --omit=dev

# copy built app and necessary runtime files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

# Create non-root user
RUN addgroup -S node && adduser -S node -G node
USER node

EXPOSE 3002
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD wget -qO- http://localhost:3002/ || exit 1
CMD ["node", "dist/main"]

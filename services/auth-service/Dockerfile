# Multi-stage Dockerfile for NestJS + Prisma (auth-service)
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
COPY package-lock.json ./
RUN npm ci --omit=dev=false

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY prisma ./prisma
COPY tsconfig*.json ./
COPY . .
RUN npx prisma generate || true
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
COPY package-lock.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
RUN addgroup -S node && adduser -S node -G node
USER node

EXPOSE 3001
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD wget -qO- http://localhost:3001/ || exit 1
CMD ["node", "dist/main"]

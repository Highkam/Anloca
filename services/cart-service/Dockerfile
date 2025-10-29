# Multi-stage Dockerfile for NestJS + Prisma (cart-service)
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
COPY package-lock.json ./
RUN npm install

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY prisma ./prisma
COPY tsconfig*.json ./
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
COPY package-lock.json ./
RUN npm install --only=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
RUN addgroup -S node >/dev/null 2>&1 || true && \
    adduser -S node -G node >/dev/null 2>&1 || true && \
    chown -R node:node /app
USER node

EXPOSE 3002
CMD ["node", "dist/main.js"]

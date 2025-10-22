# Multi-stage Dockerfile for NestJS + Prisma (auth-service)
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY package-lock.json ./
COPY tsconfig*.json ./
COPY prisma ./prisma
COPY . .

RUN npm ci
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

EXPOSE 3001
CMD ["node", "dist/main"]

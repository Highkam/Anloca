# Multi-stage Dockerfile for NestJS + Prisma (cart-service)
FROM node:20-alpine AS builder
WORKDIR /app

# Install build deps
COPY package*.json ./
COPY package-lock.json ./
COPY tsconfig*.json ./

# Copy prisma schema early for caching
COPY prisma ./prisma

# Copy source
COPY . .

RUN npm ci
# Generate Prisma client if prisma CLI available
RUN npx prisma generate || true
RUN npm run build

# Runner image
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy only production deps
COPY package*.json ./
COPY package-lock.json ./
RUN npm ci --omit=dev

# Copy built artifacts and prisma client
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

EXPOSE 3002
CMD ["node", "dist/main"]

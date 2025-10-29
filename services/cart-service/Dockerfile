# Multi-stage Dockerfile for NestJS + Prisma (cart-service)
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
COPY package-lock.json ./
RUN npm install --silent

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
RUN npm install --silent

# copy built app and necessary runtime files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

# Create non-root user
RUN addgroup -S node >/dev/null 2>&1 || true; adduser -S node -G node >/dev/null 2>&1 || true
USER node

EXPOSE 3002
CMD ["node", "dist/main"]

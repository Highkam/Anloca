FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache openssl libc6-compat
COPY package*.json ./
COPY package-lock.json ./
RUN npm install --silent --no-audit --no-fund --prefer-offline

FROM node:20-alpine AS builder
WORKDIR /app
RUN apk add --no-cache openssl libc6-compat
COPY --from=deps /app/node_modules ./node_modules
COPY prisma ./prisma
COPY tsconfig*.json ./
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
RUN apk add --no-cache openssl libc6-compat
RUN apk add --no-cache openssl libc6-compat
COPY package*.json ./
COPY package-lock.json ./
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/tsconfig.build.json ./tsconfig.build.json
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
RUN mkdir -p /tmp/prisma && chown -R node:node /tmp/prisma /app /app/node_modules
COPY --from=builder /app/prisma ./prisma
RUN addgroup -S node >/dev/null 2>&1 || true &&     adduser -S node -G node >/dev/null 2>&1 || true
USER node

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]

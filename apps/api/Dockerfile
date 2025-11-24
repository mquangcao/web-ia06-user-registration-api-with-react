# ------------------------------
# Base image
# ------------------------------
FROM node:18-alpine AS base

RUN apk add --no-cache libc6-compat
RUN apk update


# ------------------------------
# Builder stage
# ------------------------------
FROM base AS builder
WORKDIR /app

RUN npm install -g turbo

COPY . .

RUN turbo prune api --docker


# ------------------------------
# Installer stage
# ------------------------------
FROM base AS installer
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ ./

# Root package files
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json

# tsconfig gốc (prune không copy)
COPY tsconfig*.json ./

# Install deps
RUN npm install --omit=dev

# Add global tools for building libs/*
RUN npm install -g typescript
RUN npm install -g @types/node

# Copy pruned source
COPY --from=builder /app/out/full/ ./
COPY turbo.json turbo.json

# Build API
RUN npx turbo build --filter=api...


# ------------------------------
# Runner stage
# ------------------------------
FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 appgroup
RUN adduser --system --uid 1001 appuser
USER appuser

COPY --from=installer /app ./

CMD ["node", "apps/api/dist/main.js"]

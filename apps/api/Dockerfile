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

# Install turbo globally
RUN npm install -g turbo

COPY . .

# Prune workspace for API build
RUN turbo prune api --docker


# ------------------------------
# Installer stage
# ------------------------------
FROM base AS installer
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ ./

# Copy root package.json + lockfile (vì prune không tạo ra file này)
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json

# Install dependencies (prod only)
RUN npm install --omit=dev

#❗ IMPORTANT FIX — add TypeScript for building libs/*
RUN npm install -g typescript

# Copy pruned source
COPY --from=builder /app/out/full/ ./
COPY turbo.json turbo.json

# Build API workspace (now tsc is available)
RUN npx turbo build --filter=api...


# ------------------------------
# Runner stage
# ------------------------------
FROM base AS runner
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 appgroup
RUN adduser --system --uid 1001 appuser
USER appuser

# Copy built output
COPY --from=installer /app ./

CMD ["node", "apps/api/dist/main.js"]

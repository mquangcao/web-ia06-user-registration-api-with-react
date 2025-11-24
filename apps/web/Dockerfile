FROM node:18-alpine AS base
# Base image không cần pnpm
# Chỉ giữ nguyên environment clean
RUN apk add --no-cache libc6-compat
RUN apk update


# ------------------------------
# Builder stage
# ------------------------------
FROM base AS builder
WORKDIR /app

# Install turbo globally
RUN npm install -g turbo

# Copy full repo
COPY . .

# Prune workspace for web
RUN turbo prune web --docker


# ------------------------------
# Installer stage (install deps)
# ------------------------------
FROM base AS installer
WORKDIR /app

# Copy workspace metadata from prune
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ ./

# IMPORTANT: dùng lockfile của npm
COPY --from=builder /app/out/package-lock.json ./package-lock.json
COPY --from=builder /app/out/package.json ./package.json

# Install (production only)
RUN npm install --omit=dev

# Copy full source for web
COPY --from=builder /app/out/full/ ./
COPY turbo.json turbo.json

# Environment variable for API host
ENV NEXT_PUBLIC_API_HOST=$NEXT_PUBLIC_API_HOST

# Build Next.js app
RUN npx turbo build --filter=web...


# ------------------------------
# Runner stage
# ------------------------------
FROM base AS runner
WORKDIR /app

# Security: non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Copy needed runtime files
COPY --from=installer /app/apps/web/next.config.js .
COPY --from=installer /app/apps/web/package.json .

# Use Next.js standalone output (smaller image)
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

# Final command
CMD ["node", "apps/web/server.js"]

# ------------------------------
# Base image
# ------------------------------
FROM node:18-alpine AS base

# ------------------------------
# Builder: chạy turbo prune cho api
# ------------------------------
FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app

# Cài turbo cho build
RUN npm install -g turbo

COPY . .

# Tạo bản prune để build Docker nhanh hơn
RUN turbo prune api --docker


# ------------------------------
# Installer: cài thư viện bằng npm
# ------------------------------
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app

# Copy workspace metadata từ turbo prune
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ ./
COPY --from=builder /app/out/package-lock.json ./package-lock.json
COPY --from=builder /app/out/package.json ./package.json

# Cài dependencies
RUN npm install --omit=dev

# Copy toàn bộ source đã prune
COPY --from=builder /app/out/full/ ./
COPY turbo.json turbo.json

# Build API workspace
RUN npx turbo build --filter=api...


# ------------------------------
# Runner: chạy API
# ------------------------------
FROM base AS runner

WORKDIR /app

# Tạo user không phải root
RUN addgroup --system --gid 1001 appgroup
RUN adduser --system --uid 1001 appuser
USER appuser

# Copy output đã built
COPY --from=installer /app ./

CMD ["node", "apps/api/dist/index.js"]

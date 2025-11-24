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

# Copy full repo
COPY . .

# Prune workspace for web
RUN turbo prune web --docker


# ------------------------------
# Installer stage
# ------------------------------
FROM base AS installer
WORKDIR /app

# Copy metadata của workspace
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ ./

# Copy file root để npm install
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json

# Cài dependencies
RUN npm install --omit=dev

# Copy source đã prune
COPY --from=builder /app/out/full/ ./
COPY turbo.json turbo.json

# Build React/Vite app
ENV VITE_API_HOST=$VITE_API_HOST

RUN npx turbo build --filter=web...


# ------------------------------
# Runner stage (serve static files)
# ------------------------------
FROM nginx:alpine AS runner

# Copy build output từ Vite
COPY --from=installer /app/apps/web/dist /usr/share/nginx/html

# Nếu cần chỉnh nginx.conf thì thêm ở đây
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

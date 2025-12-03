FROM node:20-alpine AS base
# NestJS API Dockerfile

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm install --legacy-peer-deps --ignore-scripts

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

ARG DATABASE_HOST
ENV DATABASE_HOST=$DATABASE_HOST

ARG DATABASE_PORT
ENV DATABASE_PORT=$DATABASE_PORT


ARG DATABASE_USERNAME
ENV DATABASE_USERNAME=$DATABASE_USERNAME

ARG DATABASE_PASSWORD
ENV DATABASE_PASSWORD=$DATABASE_PASSWORD

ARG DATABASE_DB_NAME
ENV DATABASE_DB_NAME=$DATABASE_DB_NAME

RUN npm run build -- --filter=api...

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nestjs
RUN adduser --system --uid 1001 nestjs

# Copy all necessary files for production
COPY --from=installer --chown=nestjs:nestjs /app /app

USER nestjs

WORKDIR /app/apps/api

CMD ["node", "dist/main.js"]
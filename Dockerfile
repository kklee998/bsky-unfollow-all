FROM oven/bun:1.2.13 AS base
WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source files
COPY bsky_unfollow_all.ts ./

# Set the entrypoint
ENTRYPOINT ["bun", "bsky_unfollow_all.ts"]

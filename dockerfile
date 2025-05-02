# Stage 1: Build dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install

# Stage 2: Copy source and build app
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Production runtime
FROM node:20-alpine
WORKDIR /app

# Copy compiled code and node_modules
COPY --from=build /app/dist ./dist
COPY --from=deps /app/node_modules ./node_modules

# Copy env file
COPY .env .env

# Expose port (ubah sesuai .env)
EXPOSE 5001

# Jalankan app (ubah sesuai kebutuhan)
CMD ["node", "dist/index.js"]
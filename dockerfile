# Development image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Install tsx for running TypeScript directly
RUN npm install -D tsx

# Copy source code
COPY . .

# Expose port sesuai kebutuhan
EXPOSE 5001

# Jalankan app dalam mode development
CMD ["npx", "run", "dev"]
# Build environment
FROM node:20.11.1 AS build
WORKDIR /usr/src/app

# Copy package.json and package-lock.json, install dependencies, and cache layers
COPY package*.json ./
RUN npm install

# Copy the rest of the application source code and build it
COPY . .
RUN npm run build

# Production environment
FROM nginx:stable-alpine
# Copy the built files from the build stage
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
# Copy custom Nginx configuration, if any
COPY --from=build /usr/src/app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
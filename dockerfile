FROM nginx:stable-alpine

# Copy the built files from the build stage into Nginx directory
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Copy custom Nginx configuration (ensure the nginx.conf file exists in your source code)
COPY --from=build /usr/src/app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
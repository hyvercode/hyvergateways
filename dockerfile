# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install -g tsx

RUN npm update

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 5001

# Command to run the application
CMD ["npm", "start"]
# Server - Dockerfile

# Use the official Node.js image as the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the source code
COPY . .

# Expose the port the application will run on
EXPOSE 3001

# Start the application
CMD ["npm", "run", "dev"]

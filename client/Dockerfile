# Step 1: Build the app using Node

FROM node:18 as build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . ./

# Build the app
RUN npm run build:clean

# Step 2: Serve the app from Nginx
FROM nginx:stable-alpine as production

# Copy build output from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the listening port
EXPOSE 3000

# Copy Nginx configuration file
COPY ./nginx.conf /etc/nginx/nginx.conf

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

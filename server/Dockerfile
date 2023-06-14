# First Stage
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./

# Install all dependencies
RUN npm ci

# Copy the source code
COPY . .

# Build the TypeScript code
RUN npm run build

# Second Stage
FROM node:18

WORKDIR /app

COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy the built JavaScript code from the first stage
COPY --from=builder /app/dist ./dist

# Expose the port the application will run on
EXPOSE 3001

# Start the application
CMD ["node", "dist/app.js"]

# Used this to work with bcrypt dependency, have a look here:
# https://stackoverflow.com/questions/32105251/bcrypt-invalid-elf-header-with-docker-and-sails-js

FROM node:20

# Create a directory for the application
RUN mkdir -p /usr/src/app

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json to the container
COPY package.json /usr/src/app/

# Install dependencies
RUN npm install

# Copy the application code to the container
COPY . /usr/src/app

# Expose port 3001
EXPOSE 3001

# Start the application
CMD [ "npm", "start" ]

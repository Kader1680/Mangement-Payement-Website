# Use Node.js 20 as base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first for caching layer
COPY package*.json ./

RUN npm init

# Install dependencies and rebuild native modules, if any
RUN npm install --build-from-source

# Install nodemon globally for auto-reloading in development
RUN npm install -g nodemon

# Check the node version (optional, just for debugging)
RUN node -v

# Copy the rest of the application code to the container
COPY . .

# Expose the port your app will run on (change this if needed)
EXPOSE 3000

# Start the application using node or nodemon (if you want auto-reloading in dev)
CMD ["npm", "start"]

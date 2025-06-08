# Use Node.js image
FROM node:20 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all files in the current directory to /app
COPY . .

# Build the React app
RUN npm run build

# Use Nginx to serve the build files
FROM nginx:alpine

# Copy the build folder to the Nginx container
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

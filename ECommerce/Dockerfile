# Step 1: Use a Node.js image to build the app
FROM node:16 AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the app's files
COPY . .

# Step 6: Build the Vite app for production
RUN npm run build

# Step 7: Use Nginx to serve the built app
FROM nginx:alpine

# Step 8: Copy the build folder to the Nginx container
COPY --from=build /app/dist /usr/share/nginx/html

# Step 9: Expose port 80
EXPOSE 80

# Step 10: Run Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]

# Use Node.js as the base image
FROM node:lts-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the frontend
RUN npm run build

# Install PM2 globally
RUN npm install -g pm2


ENV VITE_BACKEND_URL=https://muaddib-be-72554550959.europe-central2.run.app

# Expose the port for the app
EXPOSE 8080

# Start the app with PM2
CMD ["pm2-runtime", "server.js"]

FROM node:18-alpine

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=password

WORKDIR /home/product-service

# Copy package.json and package-lock.json first to leverage Docker cache
COPY . .

# Install dependencies
RUN npm ci

# Build the application
RUN npm run build

# Specify the command to run the app
CMD ["npm", "start"]
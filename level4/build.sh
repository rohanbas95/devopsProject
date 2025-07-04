#!/bin/bash

echo "Installing dependencies..."
npm install --prefix frontend
npm install --prefix product-service
npm install --prefix user-service

echo "Building projects..."
npm run build --prefix frontend
npm run build --prefix product-service
npm run build --prefix user-service

echo "Starting projects..."
npm run start --prefix frontend &
npm run start --prefix product-service &
npm run start --prefix user-service &
wait
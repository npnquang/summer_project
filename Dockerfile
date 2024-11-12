# syntax=docker/dockerfile:1

# Specify Node version as a build argument
ARG NODE_VERSION=22.6.0

# Build Stage
FROM node:${NODE_VERSION}-alpine AS build

# Set working directory for frontend build
WORKDIR /usr/src/app/frontend

# Copy only the frontend source files
COPY ./frontend .

# Install dependencies and build the Angular app
RUN npm i -g @angular/cli && npm ci && ng build --configuration production

# Product Stage
FROM node:${NODE_VERSION}-alpine AS product

# Use production node environment by default.
ENV NODE_ENV=production

# Set working directory for the backend
WORKDIR /usr/src/app

# Install the dependencies with mount for caching
RUN --mount=type=bind,source=./backend/package.json,target=./backend/package.json \
    --mount=type=bind,source=./backend/package-lock.json,target=./backend/package-lock.json \
    --mount=type=cache,target=/root/.npm \
    cd ./backend && npm ci --omit=dev

# Copy backend source files
COPY ./backend ./backend

# Copy built frontend files from the build stage to the public folder (or any directory your server expects)
COPY --from=build /usr/src/app/frontend/dist ./frontend/dist

# Set permissions for non-root execution
USER node

# Expose the port that the application listens on
EXPOSE 8080

# Run the backend server
CMD ["sh", "-c", "cd ./backend && node server.js"]

# Use Node.js LTS (Latest) as the base image
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Install necessary build tools and dependencies
RUN apk add --no-cache python3 make g++

# RUN apk add nano

# Copy configuration files first
COPY package*.json ./
COPY tsconfig.json ./

# Install ALL dependencies (including devDependencies)
RUN npm install --force

# Copy source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate --schema=./src/prisma/schema.prisma

# Build TypeScript code
RUN npm run build

# Create volumes for data persistence
VOLUME ["/usr/src/app/data"]
VOLUME ["/usr/src/app/logs"]

# Install ONLY tsconfig-paths for production
RUN npm prune --production && \
    npm install tsconfig-paths && \
    apk del python3 make g++

# Expose the port your app runs on
EXPOSE 8085

# Set node environment
ENV NODE_ENV=production

# Create and use non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN chown -R appuser:appgroup /usr/src/app
USER appuser

# Start the application
# CMD ["node", "-r", "tsconfig-paths/register", "./dist/index.js"]

#TODO: Change this to production
# CMD ["npm", "run", "dev"]
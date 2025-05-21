# Use Node.js 18 Alpine as the base image for a smaller footprint and faster builds
# This is the build stage where we compile and prepare our application
FROM node:18-alpine AS build

# Set the working directory for all subsequent commands
# Using /usr/src/app is a common convention for Node.js applications
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) to leverage Docker cache
# The --chown flag ensures proper file ownership in the container
COPY --chown=node:node package*.json ./

# Install dependencies using npm ci for consistent and reliable builds
# npm ci is preferred in CI/CD environments as it's more strict than npm install
RUN npm ci

# Copy the entire application source code into the container
# The --chown flag ensures all files are owned by the node user for security
COPY --chown=node:node . .

# Build the application using the build script defined in package.json
# This typically involves transpilation, bundling, and optimization
RUN npm run build

# Set NODE_ENV to production to enable optimizations
# This affects how some dependencies behave and can improve performance
ENV NODE_ENV production

# Reinstall dependencies with --only=production to remove devDependencies
# This significantly reduces the final image size by removing unnecessary packages
# Also clean npm cache to further reduce image size
RUN npm ci --only=production && npm cache clean --force

# Switch to non-root user for security best practices
# This reduces the attack surface if the container is compromised
USER node

###################
# PRODUCTION STAGE
###################

# Start a new build stage for the production image
# This creates a minimal image without build tools and source code
FROM node:18-alpine AS production

# Create app directory
WORKDIR /usr/src/app

# Copy the bundled code and production dependencies from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# Start the server using the production build
CMD [ "node", "dist/main.js" ]

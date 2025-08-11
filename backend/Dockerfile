# Use official Node.js 18 image
FROM node:18-alpine

# Install MySQL client for health checks (optional)
RUN apk add --no-cache mysql-client

# Create and set working directory
WORKDIR /usr/src/app

# Copy package files first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all application files
COPY . .

# Expose application port
EXPOSE 8080

# Health check (optional but recommended)
HEALTHCHECK --interval=30s --timeout=5s \
  CMD mysql -h $MYSQL_HOST -u $MYSQL_USER -p$MYSQL_PASSWORD -e "SELECT 1" || exit 1

# Start the application
CMD ["node", "script.js"]

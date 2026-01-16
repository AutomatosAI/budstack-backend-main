FROM node:18.18.0

# Set your environment variable
ARG PROD_DATABASE_URL
ENV PROD_DATABASE_URL=$PROD_DATABASE_URL

# Create app directory
WORKDIR /dr-green-backend

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Install Prisma globally (version 5.2.0 compatible with Node 18)
RUN npm install -g prisma@5.2.0

# Copy the entire project
COPY . .

WORKDIR /dr-green-backend/hardhat
RUN npm install --legacy-peer-deps

WORKDIR /dr-green-backend

# Expose the necessary port
EXPOSE 3000

# Copy the startup script into the container
COPY startup.sh /startup.sh

# Give execute permissions to the script
RUN chmod +x /startup.sh

# Set the script as the entry point
ENTRYPOINT ["/startup.sh"]

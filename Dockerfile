# Use a base image that has both Node.js and Ollama
FROM node:18-bullseye-slim

# Install Ollama
RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://ollama.com/install.sh | sh

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json, and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire project into the container
COPY . .

# Install tsx globally for running TypeScript
RUN npm install -g tsx

# Expose ports for Ollama and your Node.js server
EXPOSE 11434 8888

# Start both Ollama and Node.js server using the entrypoint script
CMD ["/entrypoint.sh"]

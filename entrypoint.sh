#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status

echo "🔴 Starting the Ollama server..."
# Start Ollama in the background
ollama serve &
# Record Process ID
pid=$!

# Pause for Ollama to start
sleep 5

echo "🟢 Ollama server started!"

# Pull the LLAMA model
echo "🔴 Retrieve LLAMA3 model..."
ollama pull llama3.2:1b
echo "🟢 Done!"

# Start the Express server using npx
echo "🔴 Starting the Express server..."
npx tsx src/app.ts  # Run the server in the background

# Wait for Ollama process to finish
wait $pid

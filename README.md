# Build: 
docker build --platform linux/amd64 -t ollama-llm .

docker build --platform linux/amd64 -t ollama-llm:v1.0 .

# RUN: 
docker run -d --platform linux/amd64 -v ollama:/root/.ollama -p 11434:11434 -p 8080:8080 --name ollama-llm ollama-llm

docker run -d --platform linux/amd64 -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama

from ollama docs: docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama

docker run -d --platform linux/amd64 -v ollama:/root/.ollama -p 11434:11434 -p 8080:8080 --name ollama-llm ollama-llm


docker build --platform linux/amd64 -t ollama-llm . --no-cache
# Stop container : 
docker stop ollama-llm
# Remove container : 
docker rm -f ollama-llm
# Remove Image: 
docker rmi ollama-llm
# Prune: 
docker system prune -a

// completely remove 
# Remove unused image:
docker image prune

# Remove dangling images:
docker rmi $(docker images -q)


# Debug:
docker exec -it d5bb15023c88 /bin/sh

curl http://127.0.0.1:11434/api/status


curl -X POST http://127.0.0.1:11434/api/generate -d '{"model":"llama3.2","prompt":"Why is the sky blue?"}'

curl -X POST http://127.0.0.1:11434/chat -d '{"model":"llama3.2","prompt":"Why is the sky blue?"}'



## Docker-compose
# Clean up: 
docker-compose down --volumes
docker system prune -f
# Build: 
docker build -t odunu-llama .
# compose up: 
docker-compose up -d


# Test: 
docker exec -it 3f2f68a8a194 /bin/sh
curl http://ollama:11434/api/status

 curl http://127.0.0.1:11434/

 curl http://ollama:11434/api/status
 curl http://localhost:11434/api/


 curl -X POST http://localhost:8888/chat -H "Content-Type: application/json" -d '{"messages":[{"role":"user","content":"Hello!"}]}'

# network ls: 
docker network ls

# network inspect:
docker network inspect odnu-llama3-server_default


# curl: 
curl -X POST http://localhost:8888/chat \
-H "Content-Type: application/json" \
-d '{
  "prompt": "In one word can describe the sky?"
}'

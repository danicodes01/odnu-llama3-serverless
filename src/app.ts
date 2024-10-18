import express, { Request, Response } from "express";
import { Ollama } from "@langchain/ollama";
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const ollama = new Ollama({
    baseUrl: "http://localhost:11434", // Updated base URL
    model: "llama3.2:1b",
    temperature: 0.3,
    stop: ["User:"],
  });  
  
// Chat handler with incremental streaming
const chatHandler = async (req: Request, res: Response): Promise<void> => {
    const userPrompt = req.body.prompt; // Get the prompt from the request body

    if (!userPrompt) {
        res.status(400).send({ error: "Prompt is required." });
        return;
    }

    // Create the AI prompt
    const aiPrompt = `
      You are Spacebot, a friendly AI with a love for space. You are knowledgeable about current events in space, including NASA's latest astronomy pictures, SpaceX launches, meteor showers, tech patents, and research papers.
      If the user asks about space, NASA, or SpaceX, provide relevant details. Otherwise, keep your responses short and witty.
      User: ${userPrompt}
      AI: `;

    try {
        const stream = await ollama.stream(aiPrompt); // Stream response from Ollama

        // Set headers for Server-Sent Events (SSE)
        res.setHeader("Content-Type", "text/event-stream");

        // Streaming response
        try {
            for await (const chunk of stream) {
                res.write(`data: ${JSON.stringify({ message: chunk, event: "TYPING" })}\n\n`);
            }
            res.write(`data: ${JSON.stringify({ event: "DONE" })}\n\n`);
        } catch (e) {
            res.write(`data: ${JSON.stringify({ event: "DONE" })}\n\n`);
        } finally {
            res.write(`data: ${JSON.stringify({ event: "DONE" })}\n\n`);
            res.end();
        }
    } catch (error) {
        console.error("Error during chat processing:", error);
        res.status(500).send({ error: "Failed to get response from LLM" });
    }
};

// Set up the route using the chat handler
app.post("/chat", chatHandler);

// Start the server
const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});





/**
 * import express, { Request, Response } from "express";
import { Ollama } from "@langchain/ollama";
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const ollama = new Ollama({
  baseUrl: "http://ollama:11434", // Ollama LLM running locally
  model: "llama3.2",                 // Change this to "llama3.2:1b" for a smaller model
  temperature: 0.3,
  stop: ["User:"],
});

// Chat handler with incremental streaming
app.post("/chat", async (req: Request, res: Response) => {
    const userMessages = req.body.messages || []; // Expect an array of message objects
  
    try {
      const stream = await ollama.stream(userMessages); // Pass only messages
  
      // Set headers for Server-Sent Events (SSE)
      res.setHeader("Content-Type", "text/event-stream");
  
      // Streaming response using the provided logic
      try {
        for await (const chunk of stream) {
          res.write(`data: ${JSON.stringify({ message: chunk, event: "TYPING" })}\n\n`);
        }
        res.write(`data: ${JSON.stringify({ event: "DONE" })}\n\n`);
      } catch (e) {
        res.write(`data: ${JSON.stringify({ event: "DONE" })}\n\n`);
      } finally {
        res.write(`data: ${JSON.stringify({ event: "DONE" })}\n\n`);
        res.end();
      }
    } catch (error) {
        console.error("Error during chat processing:", error);
        res.status(500).send({ error: "Failed to get response from LLM" });
    }
  });
  
 */
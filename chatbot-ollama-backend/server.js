import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const OLLAMA_API = process.env.OLLAMA_API;
const MODEL = process.env.MODEL;

// 🧠 Chat endpoint
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    const response = await axios.post(
      OLLAMA_API,
      { model: MODEL, prompt: message, stream: false },
      { responseType: "json" }
    );

    // Ollama returns the full response in .data.response when stream:false
    res.json({ reply: response.data.response || "No response from model" });
  } catch (error) {
    console.error("Error communicating with Ollama:", error.message);
    if (error.response && error.response.data) {
      console.error("Ollama error:", error.response.data);
    }
    res.status(500).json({ error: "Error communicating with Ollama" });
  }
});


// ✅ Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

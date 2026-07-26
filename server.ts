import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize GoogleGenAI lazily / safely
const getAi = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is missing.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Endpoint: Ask Chef AI / Kitchen Troubleshooter
app.post("/api/chef/ask", async (req, res) => {
  try {
    const { question, contextDish } = req.body;
    if (!question || typeof question !== "string") {
      res.status(400).json({ error: "Question string is required." });
      return;
    }

    const ai = getAi();
    const systemInstruction = `You are a world-class Executive Chef and Culinary Educator with deep knowledge of kitchen science, culinary chemistry, ratios, flavor pairings, and kitchen troubleshooting.
Provide clear, actionable, precise, and encouraging answers. Keep explanations structured with markdown bullet points, highlight temperatures, timings, and scientific reasons (e.g. Maillard reaction, emulsification, protein coagulation) when relevant.
Context dish if applicable: ${contextDish || "General Cooking"}.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: question,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ answer: response.text || "Sorry, no response could be generated." });
  } catch (err: any) {
    console.error("Error in /api/chef/ask:", err);
    res.status(500).json({ error: err?.message || "Failed to query Chef AI" });
  }
});

// Endpoint: Generate Custom Cooking Manual Guide
app.post("/api/chef/generate-manual", async (req, res) => {
  try {
    const { dishName, dietaryPrefs, servingSize = 4 } = req.body;
    if (!dishName || typeof dishName !== "string") {
      res.status(400).json({ error: "dishName is required." });
      return;
    }

    const ai = getAi();
    const prompt = `Generate a detailed, professional Cooking Manual for the dish: "${dishName}".
Dietary preferences or constraints: "${dietaryPrefs || "None"}".
Target servings: ${servingSize}.

Return JSON strictly matching the schema:
{
  "title": "Dish title",
  "summary": "Brief culinary description and flavor profile",
  "cuisine": "Cuisine type",
  "prepTimeMinutes": 15,
  "cookTimeMinutes": 30,
  "difficulty": "Easy" | "Intermediate" | "Advanced",
  "servings": 4,
  "keyTechniques": ["Searing", "Deglazing", "Emulsifying"],
  "equipmentNeeded": ["Heavy skillet", "Whisk", "Meat thermometer"],
  "ingredients": [
    { "name": "Ingredient name", "amount": 200, "unit": "g" | "tbsp" | "tsp" | "cup" | "pcs" | "cloves" | "pinch", "notes": "optional prep tip" }
  ],
  "steps": [
    {
      "stepNumber": 1,
      "title": "Short title for step",
      "instruction": "Detailed, step-by-step instruction explaining 'what', 'how', and 'why'.",
      "proTip": "Chef's secret technique or cue (e.g., look for golden brown color)",
      "timerSeconds": 300
    }
  ],
  "troubleshooting": [
    { "issue": "Common mistake or problem", "solution": "How to prevent or fix it" }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            summary: { type: Type.STRING },
            cuisine: { type: Type.STRING },
            prepTimeMinutes: { type: Type.NUMBER },
            cookTimeMinutes: { type: Type.NUMBER },
            difficulty: { type: Type.STRING },
            servings: { type: Type.NUMBER },
            keyTechniques: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            equipmentNeeded: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  amount: { type: Type.NUMBER },
                  unit: { type: Type.STRING },
                  notes: { type: Type.STRING },
                },
                required: ["name", "amount", "unit"],
              },
            },
            steps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  stepNumber: { type: Type.NUMBER },
                  title: { type: Type.STRING },
                  instruction: { type: Type.STRING },
                  proTip: { type: Type.STRING },
                  timerSeconds: { type: Type.NUMBER },
                },
                required: ["stepNumber", "title", "instruction"],
              },
            },
            troubleshooting: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  issue: { type: Type.STRING },
                  solution: { type: Type.STRING },
                },
                required: ["issue", "solution"],
              },
            },
          },
          required: [
            "title",
            "summary",
            "keyTechniques",
            "equipmentNeeded",
            "ingredients",
            "steps",
          ],
        },
      },
    });

    const manualData = JSON.parse(response.text || "{}");
    res.json({ manual: manualData });
  } catch (err: any) {
    console.error("Error in /api/chef/generate-manual:", err);
    res.status(500).json({ error: err?.message || "Failed to generate manual" });
  }
});

// Vite & Static file serving setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

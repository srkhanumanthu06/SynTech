import { InferenceClient } from "@huggingface/inference";

const SYSTEM_PROMPT = `You are SynTech's AI Project Estimator. Given a project description, respond ONLY with a valid raw JSON object (no markdown, no code blocks).

JSON structure:
{
  "summary": "<2 sentence project summary>",
  "timeline": "<e.g. 3-6 months>",
  "budgetRange": "<e.g. $40,000 - $80,000 USD>",
  "complexity": "<Low | Medium | High | Enterprise>",
  "techStack": {
    "frontend": "<e.g. Next.js, React>",
    "backend": "<e.g. Node.js, FastAPI>",
    "database": "<e.g. PostgreSQL, MongoDB>",
    "cloud": "<e.g. AWS, GCP>",
    "ai": "<e.g. Hugging Face, OpenAI, or N/A>"
  },
  "phases": [
    { "name": "<Phase name>", "duration": "<e.g. 2 weeks>", "description": "<short description>" }
  ],
  "risks": ["<risk 1>", "<risk 2>", "<risk 3>"]
}`;

export async function POST(req) {
  try {
    const { description, industry, scale } = await req.json();

    const token = process.env.HF_TOKEN;

    if (!token) {
      return new Response(JSON.stringify({ error: "Missing Hugging Face API Token (HF_TOKEN) on server." }), { status: 500 });
    }
    if (!description) {
      return new Response(JSON.stringify({ error: "Project description is required." }), { status: 400 });
    }

    const client = new InferenceClient(token);

    const completion = await client.chatCompletion({
      model: "meta-llama/Meta-Llama-3-8B-Instruct", // Super fast model
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `RESPOND ONLY IN RAW JSON.\nProject Description: ${description}\nIndustry: ${industry || "General"}\nTeam Scale: ${scale || "Small (1-10)"}` }
      ],
      temperature: 0.2,
      max_tokens: 1500,
    });

    let responseText = completion.choices[0].message.content;
    responseText = responseText.replace(/```json/gi, "").replace(/```/g, "").trim();
    
    // Find the first { and last } to ensure pure JSON
    const firstBrace = responseText.indexOf('{');
    const lastBrace = responseText.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
        responseText = responseText.substring(firstBrace, lastBrace + 1);
    }
    
    const data = JSON.parse(responseText);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Estimator API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to generate estimate. Make sure HF_TOKEN and model are valid." }), { status: 500 });
  }
}


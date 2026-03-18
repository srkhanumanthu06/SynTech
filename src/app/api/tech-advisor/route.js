import { InferenceClient } from "@huggingface/inference";

const SYSTEM_PROMPT = `You are SynTech's AI Tech Stack Advisor. Given a product/startup description, respond ONLY with a valid raw JSON object (no markdown, no code blocks).

JSON structure:
{
  "headline": "<one-line tech stack name e.g. 'The Modern SaaS Stack'>",
  "rationale": "<2-3 sentences explaining the overall strategy>",
  "stack": [
    {
      "category": "<e.g. Frontend, Backend, Database, Auth, Cloud, AI/ML, DevOps>",
      "technology": "<e.g. Next.js 14>",
      "reason": "<one sentence why this is the best choice for this user's use case>",
      "alternatives": ["<alt 1>", "<alt 2>"]
    }
  ],
  "scalabilityScore": <number 1-10>,
  "learningCurve": "<Easy | Moderate | Steep>",
  "estimatedSetupTime": "<e.g. 1-2 days>",
  "warnings": ["<potential pitfall 1>", "<potential pitfall 2>"]
}`;

export async function POST(req) {
  try {
    const { description, experience, priority } = await req.json();

    if (!process.env.HF_TOKEN) {
      return new Response(JSON.stringify({ error: "Missing Hugging Face API Token (HF_TOKEN)." }), { status: 500 });
    }
    if (!description) {
      return new Response(JSON.stringify({ error: "Product description is required." }), { status: 400 });
    }

    const client = new InferenceClient(process.env.HF_TOKEN);

    const completion = await client.chatCompletion({
      model: "meta-llama/Meta-Llama-3-8B-Instruct", // Changed to faster model
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `RESPOND ONLY IN RAW JSON.\nProduct Description: ${description}\nTeam Experience Level: ${experience || "Intermediate"}\nPrimary Priority: ${priority || "Scalability"}` }
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
    console.error("TechAdvisor API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to generate tech stack. Make sure HF_TOKEN and model are valid." }), { status: 500 });
  }
}


import { InferenceClient } from "@huggingface/inference";

export async function POST(req) {
  try {
    const { industry, challenge } = await req.json();

    if (!industry || !challenge) {
      return new Response(JSON.stringify({ error: "Industry and challenge are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    if (!process.env.HF_TOKEN) {
      return new Response(JSON.stringify({ error: "Hugging Face API token is missing" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const client = new InferenceClient(process.env.HF_TOKEN);

    const PROMPT = `You are a Principal Enterprise Architect at SynTech Consulting.
    The user is looking for a tailored AI & Digital Transformation strategy.
    
    Industry: ${industry}
    Current Challenge: ${challenge}

    Analyze the industry and the specific challenge. Provide exactly 3 highly personalized, actionable enterprise-scale tech solutions.
    You must return ONLY a raw JSON object (absolutely no markdown code blocks, no trailing text) strictly adhering to this structure:
    {
      "industryContext": "<1 sentence analyzing their industry's current tech/AI landscape>",
      "recommendations": [
        {
          "name": "<Bold name of the solution>",
          "description": "<2 sentences explaining the technical implementation and how it fixes their problem>",
          "impact": "<Metric-driven expected business impact, e.g. 'Reduces manual processing time by 40%'>",
          "technologies": ["<Tech 1>", "<Tech 2>", "<Tech 3>"],
          "timeToValue": "<e.g., 4-6 weeks>"
        }
      ]
    }`;

    const completion = await client.chatCompletion({
      model: "meta-llama/Meta-Llama-3-8B-Instruct",
      messages: [
        { role: "user", content: "RESPOND ONLY IN RAW JSON.\n" + PROMPT }
      ],
      temperature: 0.3,
      max_tokens: 1500,
    });

    let responseText = completion.choices[0].message.content;
    
    // Clean up markdown block wrapping if the LLM adds it anyway
    responseText = responseText.replace(/```json/gi, "").replace(/```/g, "").trim();
    
    // Attempt to extract purely the JSON object
    const firstBrace = responseText.indexOf('{');
    const lastBrace = responseText.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
        responseText = responseText.substring(firstBrace, lastBrace + 1);
    }

    // Validate JSON
    const data = JSON.parse(responseText);

    if (!data.recommendations || !Array.isArray(data.recommendations)) {
      throw new Error("Invalid schema returned by LLM");
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("AI Recommender Error:", error);
    return new Response(JSON.stringify({ error: "Failed to generate solution recommendations. Please check API Key or try again." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

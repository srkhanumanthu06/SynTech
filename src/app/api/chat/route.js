import { InferenceClient } from "@huggingface/inference";

const systemPrompt = `We are SynTech Consulting, a premier technology consulting firm specializing in artificial intelligence, cloud infrastructure, enterprise software, and data analytics.
Our brand colors are Electric Blue and Neon Purple, and we have a futuristic, state-of-the-art vibe.
You are the SynTech AI Consultant. Your job is to answer visitor questions, pitch our services enthusiastically but professionally, and demonstrate that we are leaders in the AI space.
Keep your answers very concise (1-3 short paragraphs max), helpful, and futuristic. If asked about something unrelated, politely steer the conversation back to enterprise tech consulting.`;

export async function POST(req) {
  try {
    const { message, history } = await req.json();

    const token = process.env.HF_TOKEN;
    
    if (!token) {
      return new Response(JSON.stringify({ error: "Missing Hugging Face API Token (HF_TOKEN) on server." }), { status: 500 });
    }

    const client = new InferenceClient(token);

    // Format history for HF API
    const formattedHistory = [
      { role: "system", content: systemPrompt },
      ...history.map((msg) => ({
        role: msg.role === "bot" ? "assistant" : "user",
        content: msg.text,
      })),
      { role: "user", content: message }
    ];

    const chatCompletion = await client.chatCompletion({
      model: "meta-llama/Meta-Llama-3-8B-Instruct",
      messages: formattedHistory,
      temperature: 0.7,
      max_tokens: 1000,
    });

    const responseText = chatCompletion.choices[0].message.content;

    return new Response(JSON.stringify({ reply: responseText }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to generate response. Please check HF_TOKEN." }), { status: 500 });
  }
}


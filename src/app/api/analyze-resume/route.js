import { InferenceClient } from "@huggingface/inference";
import PDFParser from "pdf2json";

function extractTextFromPDF(buffer) {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser(this, 1);
    pdfParser.on("pdfParser_dataError", (errData) => reject(errData.parserError));
    pdfParser.on("pdfParser_dataReady", () => resolve(pdfParser.getRawTextContent()));
    pdfParser.parseBuffer(buffer);
  });
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("resumeFile");
    const roleTarget = formData.get("roleTarget");

    const token = process.env.HF_TOKEN;

    if (!token) {
      return new Response(JSON.stringify({ error: "Missing Hugging Face API Token (HF_TOKEN) on server." }), { status: 500 });
    }
    
    if (!file || !roleTarget) {
      return new Response(JSON.stringify({ error: "Missing resume PDF or role." }), { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    let resumeText = "";
    let imageBase64DataUrl = null;

    if (file.type === "application/pdf") {
      const rawText = await extractTextFromPDF(buffer);
      resumeText = rawText.replace(/\r\n/g, ' ');

      if (!resumeText.trim()) {
        return new Response(JSON.stringify({ error: "Could not extract text from PDF." }), { status: 400 });
      }
    } else if (file.type.startsWith("image/")) {
      imageBase64DataUrl = `data:${file.type};base64,${buffer.toString("base64")}`;
      resumeText = "[Resume content provided as image attachment]";
    } else {
      return new Response(JSON.stringify({ error: "Unsupported file type. Please upload a PDF or an Image." }), { status: 400 });
    }

    const client = new InferenceClient(process.env.HF_TOKEN);

    const PROMPT = `You are an elite AI Technical Recruiter for a top-tier tech agency. I will provide you with a candidate's resume text (or an image) and the target role they are applying for.
    
    Target Role: ${roleTarget}
    Resume Text: ${resumeText}

    Analyze the candidate strictly against the target role. You must return ONLY a raw JSON object (without markdown code blocks) strictly adhering to this structure:
    {
      "score": <number between 1 and 100 representing overall fit>,
      "isEligible": <boolean strictly true or false indicating if they meet core requirements for the role>,
      "eligibilityReason": "<1 short sentence explaining why they are eligible or not>",
      "analysis": "<2-3 sentences analyzing their primary strengths and weaknesses>",
      "roleMatching": {
        "pros": ["<pro 1>", "<pro 2>", "<pro 3>"],
        "cons": ["<con 1>", "<con 2>"]
      },
      "questions": [
        "<behavioral or technical interview question 1 specifically tailored to their resume weaknesses or stated skills>",
        "<interview question 2>",
        "<interview question 3>"
      ]
    }`;

    const userContent = [
      { type: "text", text: "RESPOND ONLY IN RAW JSON.\n" + PROMPT }
    ];

    if (imageBase64DataUrl) {
      userContent.push({
        type: "image_url",
        image_url: { url: imageBase64DataUrl }
      });
    }

    const completion = await client.chatCompletion({
      model: "meta-llama/Meta-Llama-3-8B-Instruct", // Lightning fast model
      messages: [
        { role: "user", content: userContent }
      ],
      temperature: 0.2,
      max_tokens: 1500,
    });

    let responseText = completion.choices[0].message.content;
    responseText = responseText.replace(/```json/gi, "").replace(/```/g, "").trim();
    
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
    console.error("Analysis API Error:", error);
    return new Response(JSON.stringify({ 
      error: error.message || "Failed to analyze resume.",
      hint: "Check HF_TOKEN validity and PDF format."
    }), { status: 500 });
  }
}



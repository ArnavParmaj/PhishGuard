const { GoogleGenerativeAI } = require('@google/generative-ai');

const SYSTEM_INSTRUCTION = `You are PhishGuard, an advanced phishing detection AI specialized for Indian users. 
You analyze messages in English, Hindi, Marathi, Hinglish (Hindi-English mix), and Devanagari script to identify phishing attempts, scams, and social engineering attacks.

You MUST respond with ONLY a valid JSON object — no markdown, no backticks, no extra text, no explanations outside the JSON.

The JSON must have exactly this structure:
{
  "riskLevel": "SAFE" | "SUSPICIOUS" | "HIGH_RISK",
  "confidenceScore": <number 0-100>,
  "detectedLanguage": <string describing the language(s) detected>,
  "manipulationTactic": {
    "id": "T1" | "T2" | "T3" | "T4" | "T5" | "T6" | "T7",
    "name": <string>,
    "explanation": <string>
  },
  "suspiciousPhrases": [
    { "phrase": <string>, "reason": <string> }
  ],
  "indicators": [
    { "flag": <string>, "explanation": <string> }
  ],
  "summary": <string>
}

Tactic IDs:
- T1: Urgency / Fear Tactics
- T2: False Authority / Impersonation
- T3: Too Good To Be True / Prize Scams
- T4: OTP / Credential Harvesting
- T5: Financial Fraud / Money Request
- T6: Job / Investment Scams
- T7: Romance / Emotional Manipulation

For SAFE messages with no threats, still return the full JSON with riskLevel "SAFE", confidenceScore, empty suspiciousPhrases and indicators arrays, and an appropriate summary.

IMPORTANT: Return ONLY raw JSON. No markdown formatting, no code fences, no preamble.`;

/**
 * Analyze text for phishing indicators using Gemini AI
 * @param {string} text - The message to analyze
 * @returns {Object} Analysis results with risk level, tactics, indicators, and summary
 */
async function analyzeText(text) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    const prompt = `Analyze the following message for phishing indicators:\n\n"${text}"`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    // Strip any accidental markdown code fences if the model adds them
    const cleaned = responseText
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (parseError) {
      throw new Error(`Gemini returned non-JSON response: ${cleaned.substring(0, 200)}`);
    }

    // Validate required top-level fields
    const required = ['riskLevel', 'confidenceScore', 'detectedLanguage', 'manipulationTactic', 'suspiciousPhrases', 'indicators', 'summary'];
    for (const field of required) {
      if (!(field in parsed)) {
        throw new Error(`Missing required field in Gemini response: ${field}`);
      }
    }

    return parsed;
  } catch (error) {
    console.error('aiService.analyzeText error:', error.message || error);
    throw new Error(`Phishing analysis failed: ${error.message || 'Unknown error'}`);
  }
}

module.exports = {
  analyzeText
};
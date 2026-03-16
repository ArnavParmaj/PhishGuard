// TODO: Implement actual AI/NLP logic here
// For now, returning mock data based on a HIGH RISK Hinglish phishing message

/**
 * Analyze text for phishing indicators and psychological manipulation tactics
 * @param {string} text - The text to analyze
 * @returns {Object} Analysis results in the format specified in PRD Section 6
 */
async function analyzeText(text) {
  // Mock response based on a HIGH RISK Hinglish phishing message
  return {
    "riskLevel": "HIGH_RISK",
    "confidenceScore": 92,
    "detectedLanguage": "Hinglish",
    "manipulationTactic": {
      "id": "T1",
      "name": "URGENCY TRAP + FALSE AUTHORITY",
      "explanation": "Creates artificial time pressure while impersonating trusted institutions"
    },
    "suspiciousPhrases": [
      {
        "phrase": "account suspicious activity ki wajah se block ho raha hai",
        "reason": "Indicates false urgency and threat of account loss"
      },
      {
        "phrase": "Abhi is number pe call karo",
        "reason": "Directs user to call a specific number, typical of scams"
      },
      {
        "phrase": "Agar 1 ghante mein verify nahi kiya toh aapke sare paise freeze ho jayenge",
        "reason": "Creates artificial deadline with severe consequences"
      },
      {
        "phrase": "Ye RBI ka order hai",
        "reason": "Impersonates authority figure to gain trust"
      }
    ],
    "indicators": [
      {
        "flag": "URGENCY TRAP",
        "explanation": "account will be blocked in 1 hour creates panic to bypass rational thinking"
      },
      {
        "flag": "FALSE AUTHORITY",
        "explanation": "Impersonates RBI to lend credibility to false claims"
      },
      {
        "flag": "OTP REQUEST",
        "explanation": "Directly requests sensitive information (OTP) which legitimate banks never do"
      },
      {
        "flag": "THREAT OF CONSEQUENCES",
        "explanation": "Threatens freezing of all money to induce fear"
      }
    ],
    "summary": "This message exhibits multiple psychological manipulation tactics typical of Indian banking scams. It combines false authority (impersonating RBI), artificial urgency (1-hour deadline), and direct requests for sensitive information (OTP). The language mix of English and Hindi is characteristic of Hinglish phishing attempts targeting Indian users."
  };
}

module.exports = {
  analyzeText
};
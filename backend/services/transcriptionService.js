const { GoogleGenerativeAI } = require('@google/generative-ai');

/**
 * Transcribe an audio buffer using Gemini's multimodal capabilities
 * @param {Buffer} buffer - The raw audio file buffer from multer memoryStorage
 * @param {string} mimeType - The MIME type of the audio file (e.g. "audio/webm", "audio/mp4")
 * @returns {string} The transcribed text
 */
async function transcribeAudio(buffer, mimeType) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // Convert buffer to base64 for inline data
    const base64Audio = buffer.toString('base64');

    const audioPart = {
      inlineData: {
        mimeType: mimeType,
        data: base64Audio,
      },
    };

    const textPart = {
      text: 'Transcribe this audio exactly as spoken. The audio may be in Hindi, English, Hinglish or other Indian languages. Return only the transcript text, nothing else.',
    };

    const result = await model.generateContent([audioPart, textPart]);
    const transcript = result.response.text().trim();

    if (!transcript) {
      throw new Error('Gemini returned an empty transcript');
    }

    return transcript;
  } catch (error) {
    console.error('transcriptionService.transcribeAudio error:', error.message || error);
    throw new Error(`Audio transcription failed: ${error.message || 'Unknown error'}`);
  }
}

module.exports = {
  transcribeAudio,
};
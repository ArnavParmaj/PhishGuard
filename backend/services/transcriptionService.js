// TODO: Implement actual audio transcription logic here
// For now, returning mock data

/**
 * Transcribe audio file to text
 * @param {Object} file - The uploaded file object from multer
 * @returns {string} Transcribed text
 */
async function transcribeAudio(file) {
  // Mock transcription of a Hinglish phishing call
  return `Bhai, aapka PhonePe account suspicious activity ki wajah se block ho raha hai. Abhi is number pe call karo: 9876543210. Agar 1 ghante mein verify nahi kiya toh aapke sare paise freeze ho jayenge. Ye RBI ka order hai.`;
}

module.exports = {
  transcribeAudio
};
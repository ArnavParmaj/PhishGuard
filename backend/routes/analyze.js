const express = require('express');
const multer = require('multer');
const aiService = require('../services/aiService');
const transcriptionService = require('../services/transcriptionService');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// POST /api/analyze/text - accepts { text: string }
router.post('/text', async (req, res) => {
  try {
    const { text } = req.body;

    // Validate input
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    // Call AI service to analyze text
    const analysis = await aiService.analyzeText(text);

    res.json(analysis);
  } catch (error) {
    console.error('Error analyzing text:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/analyze/audio - accepts multipart/form-data using multer
router.post('/audio', upload.single('audio'), async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'Audio file is required' });
    }

    // Call transcription service to transcribe audio
    const transcript = await transcriptionService.transcribeAudio(req.file);

    // Call AI service to analyze transcript
    const analysis = await aiService.analyzeText(transcript);

    res.json({
      transcript,
      analysis
    });
  } catch (error) {
    console.error('Error analyzing audio:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
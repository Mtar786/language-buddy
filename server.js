const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const dotenv = require('dotenv');

// Load environment variables from .env if present
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve the static client files
const publicDir = path.join(__dirname, 'client');
app.use(express.static(publicDir));

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

/**
 * Stub translation function.  Replace the implementation of this function
 * with a call to your preferred translation API (e.g., Google Translate,
 * DeepL or OpenAI).  Make sure to handle errors and edge cases when
 * integrating a real service.  See README.md for guidance on configuring
 * API keys in the `.env` file.
 *
 * @param {string} text       The text to translate.
 * @param {string} fromLang   The ISO 639-1 code of the source language.
 * @param {string} toLang     The ISO 639-1 code of the target language.
 * @returns {Promise<string>} The translated text.
 */
async function translate(text, fromLang, toLang) {
  // Simple stub: return the original text with a note about the target language
  // For a real translation, you might call an external API here.
  return `${text} (translated to ${toLang})`;
}

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  // Listen for chat messages
  socket.on('chat message', async (msg) => {
    const { text, from, to } = msg;
    try {
      const translatedText = await translate(text, from, to);
      // Broadcast the message to all connected clients
      io.emit('chat message', {
        original: text,
        translated: translatedText,
        fromLang: from,
        toLang: to,
      });
    } catch (err) {
      console.error('Translation error:', err);
      io.emit('chat error', { error: 'Unable to translate message.' });
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
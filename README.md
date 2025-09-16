# Real-Time AI‑Powered Language Buddy

This project is a **real‑time language conversation assistant** built with Node.js and Socket.IO.  It allows two people who speak different languages to communicate seamlessly by translating messages on the fly.  A lightweight web client connects to the server, detects the language of each message, translates it to the recipient's language and displays both the original and translated text.

## Features

* **Real‑time chat** – powered by Socket.IO for instant communication.
* **Automatic translation** – stubbed in `server.js` with a clear integration point for any translation API (e.g. Google Translate, DeepL, or OpenAI GPT models).
* **Multi‑language support** – clients specify their preferred language code; the server returns translations accordingly.
* **Bilingual history** – each chat message displays the original and translated versions so learners can review vocabulary and sentence structure.

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (v14 or later) and npm.

### Installation

1. **Clone the repository**

   ```bash
   git clone <your‑repo‑url>.git
   cd language‑buddy
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configuration**

   Rename `.env.example` to `.env` and, if you plan to use a real translation service, set your API keys and other secrets here.  By default, the server uses a stub translation function that simply echoes the text with a note.

4. **Start the server**

   ```bash
   npm start
   ```

5. **Open the client**

   Open `client/index.html` in a web browser.  You can open two tabs or browsers to simulate two users.  Enter different language codes to see the translation stub in action.

## Project Structure

```
language‑buddy/
├── client/             # Front‑end code
│   ├── index.html      # Minimal chat UI
│   └── style.css       # Styling for the chat UI
├── .env.example        # Example environment variables
├── .gitignore          # Files and folders to ignore in git
├── package.json        # Node.js metadata and dependencies
├── server.js           # Express/Socket.IO server with translation stub
└── README.md           # This file
```

### server.js

The server uses Express to serve the static files in `client/` and Socket.IO to handle real‑time messaging.  The translation logic lives in the `translate()` function.  Currently it returns a stub translation, but you can replace it with calls to your preferred translation API.  If you integrate a real API, remember to store keys in `.env` and reference them via `process.env`.

### client/index.html

The client is a simple HTML page that connects to the Socket.IO server.  It prompts for a preferred language code (e.g. `en` for English, `es` for Spanish) and then allows the user to send messages.  Incoming messages display both the original and translated text.

## Running in Development

To run the project in development mode with automatic reloads, you can install `nodemon` globally and then start the server via:

```bash
npm install --global nodemon
nodemon server.js
```

## Deployment

When you're ready to deploy, you can run the server using a process manager like `pm2` or host it on platforms such as Heroku, Vercel, or AWS.  Be sure to set up your environment variables on the hosting platform and update the translation function to use a production API.

## Future Improvements

This project provides a foundation for a powerful learning tool.  Possible extensions include:

* **Real translation integration** – connect to services like DeepL, Google Translate or OpenAI's GPT models for high‑quality translations.
* **Voice mode** – use Speech‑to‑Text (e.g. Whisper API) and Text‑to‑Speech for spoken conversations.
* **User authentication** – enable persistent user accounts, so learners can track progress and recall chat history.
* **Conversation topics generator** – provide prompts to encourage practice and keep discussions engaging.
* **Mobile app** – build a React Native or Flutter client for smartphones.

Contributions and suggestions are welcome!  Feel free to open an issue or pull request if you'd like to improve the project.

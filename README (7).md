# Deggendorf ChatBot

**Project maintained by Abdullah Waheed**  
*A web-based information assistant for Deggendorf, Germany.*

## Overview

Deggendorf ChatBot is an interactive, rule-based chatbot designed to help students, residents, and visitors find information about Deggendorf. Users can type questions or select predefined topics, receive responses in a chat interface, and ask related follow-up questions.

The application uses a **React + TypeScript** frontend and a **Node.js + Express + Socket.IO** backend. Replies are generated from keyword-matching rules and a per-connection conversation session. **It does not use a generative AI model or a live weather API.**

## Features

- **Interactive chat:** Send questions and receive responses over a WebSocket connection.
- **Quick topics and popular questions:** Select common queries directly from the sidebar.
- **Context-aware follow-ups:** The backend retains a topic and other state for each connected chat session.
- **Visit planner:** A guided conversation collects travel preferences and presents a simple suggested plan.
- **Reset conversation:** Clears the chat and resets the server-side session.
- **Export conversation:** Downloads the displayed messages as `chat-history.json`.
- **Responsive interface:** Layout adapts to desktop and smaller screens.
- **Links to resources:** Many answers reference useful external websites.

### Information covered

City basics and history, transportation, weather and climate, healthcare, accommodation, restaurants, shopping, Deggendorf Institute of Technology (THD), libraries, activities, city registration, emergency contacts, nearby cities, banking, and mobile networks.

> **Information notice:** Answers are maintained as static rules and may become outdated. For current schedules, prices, opening hours, and official requirements, verify the linked primary sources.

## Technology stack

| Layer | Technology |
| --- | --- |
| Frontend | React, TypeScript, Bootstrap, CSS |
| Real-time messaging | Socket.IO (`socket.io-client` and `socket.io`) |
| Backend | Node.js, Express, HTTP server |
| Chatbot logic | JavaScript keyword matching, topic/session state |
| Frontend test tooling | React Testing Library, Jest DOM |

## Project structure

The following layout describes where the supplied source files belong in a standard React project. The project also needs its normal configuration files, including `package.json`, to run.

```text
Deggendorf-ChatBot/
├── backend/
│   ├── server.js           # Socket.IO server and chat session handling
│   ├── infodata.js         # Keyword rules, topics, responses, visit planner
│   └── extraAnswers.json   # Referenced by infodata.js; provide if required
├── src/
│   ├── Components/
│   │   ├── Header.tsx      # Reset and JSON export buttons
│   │   ├── MessageArea.tsx # Chat message list
│   │   ├── MessageBubble.tsx
│   │   └── UserInput.tsx   # Message input and send button
│   ├── App.tsx             # Main chat UI and socket integration
│   ├── App.css             # Chat styling and responsive layout
│   ├── App.test.tsx        # Header rendering test
│   ├── index.tsx           # React entry point
│   ├── index.css
│   ├── logo.svg
│   ├── react-app-env.d.ts
│   ├── setupTests.ts
│   └── types.ts            # Chat message type
├── public/                 # Standard React app public assets
├── package.json           # Frontend dependencies and scripts (not supplied)
└── README.md
```

## Run locally

### Requirements

- Node.js and npm
- A complete React project with its `package.json` and `public/index.html`
- Backend files `server.js` and `infodata.js` (plus `extraAnswers.json`, which is imported by the supplied `infodata.js`)

**Note:** The provided files do not include `package.json`, `public/index.html`, or `extraAnswers.json`. Add the original project versions before expecting a working local setup. The commands below assume the frontend uses the Create React App (`react-scripts`) workflow indicated by the existing source files.

### 1. Start the backend

From the backend directory, install the server dependencies if they are not already declared in a backend `package.json`:

```bash
npm install express socket.io
node server.js
```

The supplied server listens on **http://localhost:8080**.

### 2. Start the frontend

In a separate terminal, from the frontend project root:

```bash
npm install
npm start
```

The frontend is configured to connect to `http://localhost:8080` when opened on localhost. The usual local frontend address for Create React App is **http://localhost:3000**.

### 3. Try the chatbot

Select a quick topic such as **Transportation** or **THD**, or type a question such as:

- `How do I get to Deggendorf?`
- `Where can I find accommodation?`
- `Tell me about THD`
- `Plan visit`

Use **Reset Chat** to restart or **Export JSON** to save the conversation.

## How it works

1. The React frontend establishes a Socket.IO WebSocket connection.
2. A user submits a question or selects a predefined topic.
3. The server receives the `chat message` event and passes the text plus connection-specific session state to `replyTopic()`.
4. The rule-based handler matches keywords, optionally updates the active conversation topic, and returns a response.
5. The server sends a chatbot message back to the frontend for display.

The server also handles the `reset chat` event to clear conversation state.

## Testing

A supplied frontend test checks whether the **Deggendorf ChatBot** heading renders. With the original frontend dependencies and test script installed, run:

```bash
npm test
```

This is a starter test; it does not establish full functional coverage of the chatbot or backend.

## Development notes

- **Port configuration:** `server.js` declares `process.env.PORT || 8080` but currently calls `server.listen(8080, ...)` directly. Change the listen call to use `PORT` for configurable deployments.
- **Deployment/CORS:** The backend currently permits `http://localhost:3000` and `https://deggendorf-chatbot.azurewebsites.net`. Update permitted origins when deploying elsewhere.
- **Missing data file:** `infodata.js` imports `./extraAnswers.json`, even though the extra-answer handler is not included in the active reply chain. The file must be present or the import removed for the backend to load.
- **HTML safety:** The frontend renders chatbot text as HTML via `dangerouslySetInnerHTML`. Escape or sanitize dynamic content before introducing untrusted responses.
- **Rule limitations:** Replies are based on matching words and stored topic context, so unusual phrasing or unsupported questions may trigger a fallback.

## Repository access

This project is intended to be stored in **Abdullah Waheed's private GitLab repository**. Access and reuse should follow the repository owner's permissions. No open-source license is asserted here.

## Acknowledgements

A special thank you to **Cheng** and **Taha** for their collaboration, effort, and support during the development of Deggendorf ChatBot. Your teamwork, contributions, and willingness to help made this project a valuable learning experience.

**— Abdullah Waheed**

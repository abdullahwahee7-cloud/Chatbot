Deggendorf Chatbot Setup Manual


1) OVERVIEW AND REQUIREMENTS

This project is a chatbot web application for information about Deggendorf and THD.
This project contains backend and frontend folders 
You have to install npm and Node.js to run this on your local.
For the bonus branch with OpenAI intent detection, an OpenAI API key is also required.

2) Installations:

- Backend Installation

Open a terminal in the project root and run:
cd backend
npm install

For the bonus branch, create a .env file inside the backend folder:
OPENAI_API_KEY=your_openai_api_key_here

- Frontend Installation

Open a second terminal in the project root and run:
cd frontend
npm install

3) Running Locally

- Start Frontend Locally

From the frontend folder, run:
npm start

The frontend should open at:
http://localhost:3000

- Start Backend Locally

From the backend folder, run:
node server.js

If it works, it will say in terminal:
Active on port 8080

4) Deployment

- Setup Frontend
From the frontend folder, run:
npm run build

This creates:
frontend/build/

The backend serves this build folder in production.

- On Azure deployment
The deployed application runs on Microsoft Azure App Service.
The public URL is:
https://deggendorf-chatbot.azurewebsites.net

And there you go you are finally setup.

5) Security Notes

The repository must not include:

node_modules/
API keys
.env
Azure credentials

Only source code, configuration files, documentation, and required project files should be committed.

6) Chatbot Features:

The user can type a message in the input field and press the Send button.

The chatbot supports:

Text input
Quick topic buttons
Popular question buttons
Reset chat
Export conversation as JSON

7) Common Problems and solution:

- If the frontend does not connect to the backend, check that the backend is running on port 8080.
- If dependencies are missing, run npm install again inside both the backend and frontend folders.
- If the OpenAI bonus feature does not work, check that the .env file exists inside the backend folder and contains a valid OpenAI API key.

------ END -------
const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function detectIntent(message) {

    let result = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: "You are classifying user messages for a chatbot about the city of Deggendorf and THD (Deggendorf Institute of Technology). Reply with ONLY ONE intent from this list: greeting, basicinfo, weather, history, transportation, shopping, healthcare, accommodation, restaurant, activity, cityregistration, emergency, nearbycities, school, unknown. Reply with one word only."
            },
            {
                role: "user",
                content: message
            }
        ]
    });

    return result.choices[0].message.content.trim().toLowerCase();
}

module.exports = { detectIntent };
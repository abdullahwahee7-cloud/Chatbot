const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const allowedIntents = new Set([
    'greeting',
    'basicinfo',
    'weather',
    'history',
    'transportation',
    'shopping',
    'healthcare',
    'accommodation',
    'restaurant',
    'activity',
    'cityregistration',
    'emergency',
    'nearbycities',
    'banking',
    'mobilenetwork',
    'school',
    'planningatrip',
    'unknown'
]);

async function detectIntent(message) {

    let result = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: "You are classifying user messages for a chatbot which gives information about the city of Deggendorf and THD (Deggendorf Institute of Technology). The chatbot gets questioned about food, and a lot of things. THD, DIT, university, study, degree, bachelor, master, campus, lecture, semester, admission, application and student topics MUST be classified as school. (Don't forget restaurant intent means if user wants to eat or is hungry too). Use planningatrip for itinerary, travel plan, trip plan, visit schedule, day schedule, tourist plan, route, or planning a visit. Reply with ONLY ONE intent from this list: greeting, basicinfo, weather, history, transportation, shopping, healthcare, accommodation, restaurant, activity, cityregistration, emergency, nearbycities, banking, mobilenetwork, school, planningatrip, unknown. Reply with one word only."
            },
            {
                role: "user",
                content: message
            }
        ]
    });
    
    const rawIntent = result.choices?.[0]?.message?.content?.trim().toLowerCase() || 'unknown';

    const normalizedIntent = rawIntent.replace(/[^a-z]/g, '');

    return allowedIntents.has(normalizedIntent) ? normalizedIntent : 'unknown';

}

module.exports = { detectIntent };
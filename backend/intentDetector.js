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
        model: "gpt-4.1-mini",
        temperature: 0,
        messages: [
            {
                role: "system",
                content: ` You are an intent classifier for a Deggendorf city chatbot.

              Classify the user's message into exactly ONE of these intents:
              greeting, basicinfo, weather, history, transportation, shopping, healthcare, accommodation, restaurant, activity, cityregistration, emergency, nearbycities, banking, mobilenetwork, school, planningatrip, unknown.

               Do not answer the user. Return only one intent word.

               Understand synonyms and natural language. Do not require exact keywords.

               Intent meanings: (Some examples for you, rest you should figure out yourself)
               - greeting: hi, thanks, goodbye, who are you, small talk
               - basicinfo: general facts about Deggendorf, location, population, mayor, city office
               - weather: weather, climate, temperature, rain, snow, hot, cold
               - history: history, old town, founded, historic facts
               - transportation: train, bus, car, parking, airport, station, travel to Deggendorf, getting around
               - shopping: supermarkets, stores, clothes, mall, market, groceries, buying things
               - healthcare: sick, ill, doctor, hospital, pharmacy, clinic, medical help
               - accommodation: hotel, hostel, apartment, room, rent, dormitory, housing, where to stay
               - restaurant: hungry, food, eat, meal, lunch, dinner, breakfast, restaurant, cafe, coffee, pizza, Mensa
               - activity: bored, fun, things to do, hiking, cycling, events, sightseeing, parks, leisure
               - cityregistration: Anmeldung, register address, Bürgeramt, resident registration, documents, appointment
               - emergency: police, ambulance, fire, danger, accident, stolen, theft, lost items, emergency number
               - nearbycities: nearby cities, day trips, Passau, Regensburg, Munich, Plattling, places near Deggendorf
               - banking: bank account, ATM, cash, Sparkasse, money, card, transfer
               - mobilenetwork: SIM card, mobile plan, phone contract, prepaid, internet provider
               - school: THD, DIT, university, study, bachelor, master, admission, application, campus, lecture, semester, student topics
               - planningatrip: itinerary, travel plan, trip plan, visit plan, day schedule, weekend plan, route, help planning a visit

               Use unknown only if no intent reasonably fits.`

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
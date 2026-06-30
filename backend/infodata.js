/*We are using the keywords strategy to insure the bot understand and reply the message*/
const extraAnswers = require('./extraAnswers.json');

/*The topics*/
/*We are implementing Hybrid, if OPENAI can't detect then on backup the keyword spotting works"*/
function replyTopic (message, session, intent){
   const text = message.toLowerCase();

   session.failCount = session.failCount || 0;

   if (text.length < 3) {
      session.topic = null;
      return HardFallback(session);
   }

   if (session.topic === 'visitplan') {
   const planReply = PlanVisit(text, session);

   if (planReply) {
      session.failCount = 0;
      return planReply;
   }
   }

   SetTopicFromIntent(intent, text, session);

   if (intent !== 'planningatrip') {
   const extraReply = ExtraAnswers(text, session, intent);

   if (extraReply) {
      session.failCount = 0;
      return extraReply;
   }
   }

   let AIReply;

   if (intent === 'greeting') AIReply = Greeting(text, session, intent);
   if (intent === 'planningatrip') AIReply = PlanVisit(text, session, intent);
   if (intent === 'basicinfo') AIReply = Basicinfo(text, session, intent);
   if (intent === 'weather') AIReply = Weather(text, session, intent);
   if (intent === 'history') AIReply = Historyinfo(text, session, intent);
   if (intent === 'transportation') AIReply = Transportation(text, session, intent);
   if (intent === 'shopping') AIReply = Shopping(text, session, intent);
   if (intent === 'healthcare') AIReply = Healthcare(text, session, intent);
   if (intent === 'accommodation') AIReply = Accomdation(text, session, intent);
   if (intent === 'restaurant') AIReply = Restaurant(text, session, intent);
   if (intent === 'activity') AIReply = Activity(text, session, intent);
   if (intent === 'cityregistration') AIReply = CityRegistration(text, session, intent);
   if (intent === 'emergency') AIReply = Emergency(text, session, intent);
   if (intent === 'school') AIReply = School(text, session, intent);
   if (intent === 'nearbycities') AIReply = NearbyCities(text, session, intent);
   if (intent === 'banking') AIReply = Banking(text, session);
   if (intent === 'mobilenetwork') AIReply = MobileNetwork(text, session, intent); 

   if (AIReply) {
      session.failCount = 0;
      return AIReply;
   }

   if (intent === 'unknown') {
     console.log("OpenAI has returned unknown, trying current topic first");

     const contextReply = ContinueCurrentTopic(text, session);

     if (contextReply) {
         session.failCount = 0;
         return contextReply;
      }

      session.topic = null;
   }

   const reply = 
      Greeting(text, session, false) ||
      PlanVisit(text, session, false) ||
      Basicinfo(text, session, false) ||
      Weather(text,session, false) ||
      Historyinfo (text,session, false) ||
      Emergency(text, session, false) ||
      Transportation (text,session, false) ||
      Shopping (text,session, false) ||
      Healthcare (text,session, false) ||
      Accomdation (text,session, false) ||
      Restaurant (text,session, false) ||
      Activity (text,session, false) ||
      CityRegistration(text, session, false) ||
      School(text, session, false) ||
      NearbyCities(text, session, false) ||
      ExtraAnswers(text, session, intent) ||
      NearbyCities(text, session, false) ||
      Banking(text, session, false) ||
      MobileNetwork(text, session, false); 

   if (reply) {
        session.failCount = 0;
        return reply;
   }

   return HardFallback(session);
}

function SetTopicFromIntent(intent, text, session) {
   if (!intent || intent === 'unknown') return;

   if (intent === 'basicinfo') session.topic = 'basicinfo';
   if (intent === 'weather') session.topic = 'weather';
   if (intent === 'transportation') session.topic = 'transportation';
   if (intent === 'shopping') session.topic = 'shop';
   if (intent === 'healthcare') session.topic = 'health';
   if (intent === 'restaurant') session.topic = 'restaurant';
   if (intent === 'activity') session.topic = 'activity';
   if (intent === 'cityregistration') session.topic = 'registration';
   if (intent === 'emergency') session.topic = 'emergency';
   if (intent === 'nearbycities') session.topic = 'nearbycities';
   if (intent === 'banking') session.topic = 'banking';
   if (intent === 'mobilenetwork') session.topic = 'mobilenetwork';

   if (intent === 'accommodation') {
      if (
         text.includes('student') ||
         text.includes('dorm') ||
         text.includes('private') ||
         text.includes('share') ||
         text.includes('public') ||
         text.includes('wg')
      ) {
         session.topic = 'studdor';
      } else {
         session.topic = 'hotel';
      }
   }

   if (intent === 'school') {
      if (
         text.includes('thd') ||
         text.includes('dit') ||
         text.includes('bachelor') ||
         text.includes('master') ||
         text.includes('program') ||
         text.includes('programme') ||
         text.includes('degree') ||
         text.includes('apply') ||
         text.includes('application')
      ) {
         session.topic = 'thd';
      } else {
         session.topic = 'school';
      }
   }
}

function ContinueCurrentTopic(text, session) {
   if (session.topic === 'basicinfo') return Basicinfo(text, session, false);
   if (session.topic === 'weather') return Weather(text, session, false);
   if (session.topic === 'transportation') return Transportation(text, session, false);
   if (session.topic === 'shop') return Shopping(text, session, false);
   if (session.topic === 'health') return Healthcare(text, session, false);
   if (session.topic === 'hotel') return Accomdation(text, session, false);
   if (session.topic === 'studdor') return Accomdation(text, session, false);
   if (session.topic === 'restaurant') return Restaurant(text, session, false);
   if (session.topic === 'activity') return Activity(text, session, false);
   if (session.topic === 'registration') return CityRegistration(text, session, false);
   if (session.topic === 'emergency') return Emergency(text, session, false);
   if (session.topic === 'visitplan') return PlanVisit(text, session, false);
   if (session.topic === 'school') return School(text, session, false);
   if (session.topic === 'thd') return School(text, session, false);
   if (session.topic === 'nearbycities') return NearbyCities(text, session, false); 
   if (session.topic === 'banking') AIReply = Banking(text, session, false);
   if (session.topic === 'mobilenetwork') AIReply = MobileNetwork(text, session, false); 

   return null;
}

function ExtraAnswers(text, session, intent) {
   for (const item of extraAnswers) {
      const topicMatch =
         session.topic &&
         item.topic &&
         session.topic === item.topic;

      const keywordMatch =
         item.keywords &&
         item.keywords.some(keyword =>
            text.includes(keyword.toLowerCase())
         );

      const intentMatch =
         item.defaultForIntent === true &&
         intent &&
         item.intent === intent;

      if (item.followUps && (topicMatch || item.allowDirectFollowUps === true)) {
         for (const followUp of item.followUps) {
            const followUpMatch = followUp.keywords.some(keyword =>
               text.includes(keyword.toLowerCase())
            );

            if (followUpMatch) {
               session.topic = item.topic;
               return followUp.answer;
            }
         }
      }

      if (keywordMatch || intentMatch) {
         session.topic = item.topic;
         return item.answer;
      }
   }

   return null;
}

/*Greeting*/
function Greeting (text,session, fromIntent = false) {

   if (
    text.includes('who are you') ||
    text.includes('what are you') ||
    text.includes('are you a bot')
    )
    {
    return "I am a chatbot representing the City of Deggendorf.\n\n" +
           "I can provide information about transportation, weather, shopping, accommodation, restaurants, activities, healthcare, education, mobile network, banking, and THD.";
    }

    if (text.includes('hello') ||
       text.includes('hallo') ||
       text === 'hi'||
       text.includes('hey')||
       text.includes('guten morgen')||
       text.includes('good morning')||
       text.includes('good afternoon')||
       text.includes('good evening')||
       text.includes('greetings')||
       text.includes('whats up')
       )
       {
        return "Hello! Welcome to Deggendorf. What do you want to know about our beautiful city?\n\n"+
               "You can ask me about basic infomation of Deggendorf, the history, weather, transportation, shopping, tourism, accomdations, restaurants, local events, education insitituation, banking, mobilenetwork and healthcare"
       }

    if (text.includes('how are you') ||
       text.includes('how you doing') ||
       text.includes('how are you doing') 
      )
      {
         return "I am good, thanks for asking. What do you want to know about our beautiful city?\n\n" +
               "You can ask me about basic infomation of Deggendorf, the history, weather, transportation, shopping, tourism, accomdations, restaurants, local events, education insitituation, banking, mobilenetwork and healthcare"
      }

    if (fromIntent) {
      return "Hello! Welcome to Deggendorf. What do you want to know about our beautiful city?\n\n" +
             "You can ask me about basic infomation of Deggendorf, the history, weather, transportation, shopping, tourism, accomdations, restaurants, local events, education insitituation, banking, mobilenetwork and healthcare";
    }

    return null;

}

/*Basic information */
function Basicinfo(text,session, fromIntent = false){


   if (text.includes('who is mayor') || text.includes('mayor')) {
   return "Our mayor is Dr. Christian Moser (CSU). He serves as the Lord Mayor (Oberbürgermeister) of Deggendorf.";
   }


   if (text === 'introduce') {
         return "What would you like me to introduce?\n\n" +
                "• Deggendorf\n" +
                "• THD (Deggendorf Institute of Technology)\n" +
                "• Transportation\n" +
                "• Weather\n" +
                "• Shopping\n" +
                "• Restaurants\n" +
                "• Activities\n" +
                "• Accommodation\n" +
                "• Healthcare";
      }

    if (text.includes('introduce deggendorf') ||
       text.includes('basic information') ||
       text.includes('name') ||
       text.includes('country') ||
       text.includes('where is deggendorf')
       )

       { session.topic = 'basicinfo';

         return "Deggendorf is a town in Bavaria, Germany, capital of the Deggendorf district."
               //image: "/image/DEG.jpj"       
               
       }

    if (session.topic === 'basicinfo' &&
       (text.includes('location') ||
       text.includes('located'))
       )
       return "Deggendorf is in the center of Lower Bavaria. It is located on the left bank approximately in the middle between the Danube cities of Regensburg and Passau.\n\n"+
                      "The Danube forms the town's natural border towards the south. Towards the west, north and east the town is surrounded by the foothills of the central Bavarian Forest."
                //image: "/image/map.jpd"
          
    
       /*
    if (text.includes('coat of arm') 
       )
       {return {image: "/image/coa.jpd"}
       }  
    */

     if (session.topic === 'basicinfo' &&
         (text.includes('post') ||
         text.includes('zip')||
         text.includes('zipcode'))
       )
       {return "The zipcode of Deggendorf is 94469"
       } 
         
     if (session.topic === 'basicinfo' &&
       (text.includes('population') ||
        text.includes('how many people') ||
        text.includes('how many residents'))
       )

       {return "Deggendorf's 2026 population is now estimated at 36,590."
       } 
        

    if (session.topic === 'basicinfo' &&
        (text.includes('government')||
        text.includes('office')||
        text.includes('new here'))
       )
       {return "Welcome to Deggendorf. https://www.deggendorf.de is the offical internet Portal for Deggendorf. You can find useful information here. "}

    if (fromIntent) {
      session.topic = 'basicinfo';

      return "Deggendorf is a town in Bavaria, Germany, capital of the Deggendorf district.";
   }
}
       
/*Climate*/
function Weather (text, session, fromIntent = false){

    if (text.includes('climate')||
        text.includes('weather'))
       { session.topic = 'weather';

         return "In Deggendorf, the summers are comfortable, the winters are freezing and snowy, and it is partly cloudy year round.\n\n"+
               "Over the course of the year, the temperature typically varies from -4°C to 24°C and is rarely below -12°C or above 31°C.\n\n"+
               "Based on the tourism score, the best time of year to visit Deggendorf for warm-weather activities is from late June to early September.\n\n"
       }
 
    /*if we have time we can update this by using API*/
    if (session.topic == 'weather' &&
        (text.includes('today')||
        text.includes('temperature')||
        text.includes('current')||
        text.includes('sunny')||
        text.includes('raining')||
        text.includes('cloudy')||
        text.includes('snowing')||
        text.includes('hot')||
        text.includes('cold'))
       )
       {return "For today's weather, you can check from here: https://openweathermap.org/city/2938540"
       }

    if (fromIntent) {
      session.topic = 'weather';

      return "In Deggendorf, the summers are comfortable, the winters are freezing and snowy, and it is partly cloudy year round.\n\n" +
             "Over the course of the year, the temperature typically varies from -4°C to 24°C and is rarely below -12°C or above 31°C.\n\n" +
             "Based on the tourism score, the best time of year to visit Deggendorf for warm-weather activities is from late June to early September.\n\n";
   }

   return null;

}

/*History*/
function Historyinfo(text,session, fromIntent = false){   
    if (text.includes('history')||
        text.includes('historic')||
        text.includes('founded'))

       {return "The oldest settlements in today's Deggendorf city area are located south of the Danube.\n\n"+
               "In 1002, Deggendorf was first mentioned in a document. King Heinrich II confirms his possession in Deggendorf to the Niedermünster canoness monastery in Regensburg.\n\n"+
               "In the 12th century, a first settlement was established in the north-eastern area of today's old town, which was proven by the excavations of the city archaeology.\n\n"+
               "In 1316, the widow of Duke Otto III, Agnes, granted Deggendorf town rights.\n\n"+
               "In the 19th century, the construction of Ruselstraße (1815 to 1817) and an iron bridge over the Danube (1859 to 1863) significantly improved Deggendorf's infrastructure.\n\n"+
               "In 1866, Deggendorf joined the railway network to Plattling at the instigation of an interest group of Deggendorf citizens.\n\n"+
               "The station was still in Fischerdorf at that time and only after the construction of a railway bridge over the Danube in 1877) could it be abandoned.\n\n"
       }

    if (fromIntent) {
      return "The oldest settlements in today's Deggendorf city area are located south of the Danube.\n\n" +
             "In 1002, Deggendorf was first mentioned in a document. King Heinrich II confirms his possession in Deggendorf to the Niedermünster canoness monastery in Regensburg.\n\n" +
             "In the 12th century, a first settlement was established in the north-eastern area of today's old town, which was proven by the excavations of the city archaeology.\n\n" +
             "In 1316, the widow of Duke Otto III, Agnes, granted Deggendorf town rights.\n\n" +
             "In the 19th century, the construction of Ruselstraße (1815 to 1817) and an iron bridge over the Danube (1859 to 1863) significantly improved Deggendorf's infrastructure.\n\n" +
             "In 1866, Deggendorf joined the railway network to Plattling at the instigation of an interest group of Deggendorf citizens.\n\n" +
             "The station was still in Fischerdorf at that time and only after the construction of a railway bridge over the Danube in 1877) could it be abandoned.\n\n";
   }

   return null;

}

/*Transportation*/
function Transportation (text,session, fromIntent = false) {


   if (text.includes('how to get to deggendorf?')||
       text.includes('travel')||
       text.includes('transportation')||
       text.includes('how to arrive to deggendorf?')||
       text.includes('how do i get there')||
       text.includes('how can i get there')||
       text.includes('how do i travel')||
       text.includes('how can i travel')||
       text.includes('dow do I get to deggendorf?')||
       text.includes('arrive in deggendorf')||
       text.includes('get to deggendorf')
      )
      {session.topic = 'transportation';
       return "You can reach Deggendorf by:\n\n" +
              "• Train\n" +
              "• Bus\n" +
              "• Plane\n" +
              "• Car\n\n" +
              "Which option would you like to know more about?\n\n" +
              "For parking information, reply: parking\n" +
              "For public transport, reply: citybus";           
      }

      if (session.topic === 'transportation' &&
          (text.includes('car') ||
           text.includes('auto'))
          )
         {return "A3: Cologne - Frankfurt - Nuremberg - Regensburg - Deggendorf\n\n"+
                 "A92: Munich - Deggendorf"
         }

      if (session.topic === 'transportation' &&
          (text.includes('train')||
           text.includes('db')||
           text.includes('train ticket')||
           text.includes('train station')||
           text.includes('railway'))
          )
         {return "The nearest ICE-Station is Bahnhof Plattling, you can reach Plattling from many cities in Germany.\n\n"+
                 "From Plattling, take RB35 to Deggendorf Hauptbahnhof (main station). The journey takes about 10 minutes.\n\n" +
                 "Ticket booking: https://www.bahn.de/service/fahrplaene/reiseauskunft"
         }

      if (session.topic === 'transportation' &&
         (text.includes ('bus') && !text.includes ('citybus'))
         )
         {return "You can reach Deggendorf by FlixBus from many cities,\n\n"+
                "for ticket booking please check: https://www.flixbus.com/bus/deggendorf"
         }
        
      if (session.topic === 'transportation' &&
         (text.includes ('plane'))
         )
         {return "Deggendorf is located about 100km (about 1 hour's drive) from the Franz-Josef-Strauss airport in Munich."
         }
      
      if (session.topic === 'transportation' &&
          text.includes('parking')
         )
         {return "With over 1500 parking spaces, shopping and strolling without parking stress,\n\n"+
                 "inexpensive and protected from the weather, central and no time limit.\n\n" +
                 "Simply follow our parking guidance system: https://stadtparken-deggendorf.de/?article_id=4"
         }

      if (session.topic === 'transportation' &&
          (text.includes ('citybus'))
         )
         {return "With four lines in the city bus service, we can transport you across the city area!\n\n"+
                 " Timetables and network map can be found : https://www.deggendorf.de/leben/mobilitaet-verkehr/stadtbusverkehr" 
         }

      if (fromIntent) {
      session.topic = 'transportation';

      return "You can reach Deggendorf by:\n\n" +
             "• Train\n" +
             "• Bus\n" +
             "• Plane\n" +
             "• Car\n\n" +
             "Which option would you like to know more about?\n\n" +
             "For parking information, reply: parking\n" +
             "For public transport, reply: citybus";
      }

         return null;
}

 
/*Shopping*/
function Shopping (text,session, fromIntent = false) {

   if (text.includes('supermarket') || text.includes('supermarkets')) {
      session.topic = 'shop';

      return "Supermarkets in Deggendorf:\n\n" +
             "• Lidl\n" +
             "• Aldi\n" +
             "• Rewe\n" +
             "• Edeka";
   }


   if (
      (text.includes('shop') ||
       text.includes('mall') ||
       text.includes('market') ||
       text.includes('buy') ||
       text.includes('store')) &&
      !text.includes('local market') &&
      !text.includes('supermarket')
      ) {
      session.topic = 'shop';

      return "There are many shopping opportunities in Deggendorf, including supermarkets, fashion stores or local market.\n\n" +
             "Which one would you like to know more?";
        }
      
      if (session.topic === 'shop' &&
          (text.includes('fashion') ||
           text.includes('cloth') ||
           text.includes('beauty')||
           text.includes('make-up')||
           text.includes('store'))
          )
         {return "The city center around Luitpoldplatz offers a variety of shops." +
                 " For example: Tk Maxx, Tedi, Muller, H&M, New Yorker, etc."
         }

           
      if (session.topic === 'shop' &&
          (text.includes('local market') ||
           text.includes('farm')||
           text.includes('local')) 
          )
         {return "We also have the Deggendorf farmers' market. You can buy not only vegetables, fruit, juices,\n\n"+
                 " but also meat, sausage specialties, flowers. Herbs and baked goods are also offered.\n\n"+
                 " The vegetables usually come from organic farming.\n\n"+
                 " Time: Saturday 08:00- 13:00\n\n"+
                 " Location: Stadtplatz Deggendorf, Oberer Stadtplatz"
         } 

    if (fromIntent) {
      session.topic = 'shop';

      return "There are many shopping opportunities in Deggendorf, including supermarkets, fashion stores or local market.\n\n" +
             "Which one would you like to know more?";
    }

   return null;
}

/*Healthcare*/
function Healthcare (text,session, fromIntent = false) {
   if (text.includes('sick') ||
       text.includes('uncomfortable') ||
       text.includes('hospital')||
       text.includes('clinic') ||
       text.includes('doctor')||
       text.includes('injure')||
       text.includes('treatment')||
       text.includes('pharmacy')||
       text.includes('healthcare')||
       text.includes('medical')||
       text.includes('ill'))
      {session.topic = 'health';
       return  "There are varieties healthcare insitituation in Deggendorf.\n\n"+
               " For general medical care, you can visit DONAU ISAR Klinikum Deggendorf, the largest general hospital in Deggendorf\n\n"+
               " Please call 112 if any emergency medical needs"
      }

      if (session.topic === 'health' &&
          text.includes('donau'))
         {return "Donau Isar Klinikum is located at Perlasberger Str. 41, 94469, Deggendorf\n\n" +
              " Phone: 0991/ 380-0\n\n"+
              " E-mail: info@donau-isar-klinikum.de" } 


       if (fromIntent) {
           session.topic = 'health';

      return "There are varieties healthcare insitituation in Deggendorf.\n\n" +
             " For general medical care, you can visit DONAU ISAR Klinikum Deggendorf, the largest general hospital in Deggendorf\n\n" +
             " Please call 112 if any emergency medical needs";
      }

   return null;
}

/*Accomdation*/
function Accomdation(text, session, fromIntent = false){
   
   if (text.includes('hotel')||
       text.includes('touris')||
       text.includes('accommodation')|| 
       text.includes('stay')||
       text.includes('hostel')||
       text.includes('apartment')||
       text.includes('stayover')||
       text.includes('where can i live') ||
       text.includes('rent') ||
       text.includes('room') ||
       text.includes('flat') ||
       text.includes('housing') ||
       text.includes('housing options') ||
       text.includes('wohnung')

       )
      {session.topic = 'hotel';
       
       return "Welcome to Deggendorf! Most accommodations in Deggendorf can be found in our booking portal:\n\n"+
              " https://tportal.tomas.travel/StadtDeggendorf/ukv?globalreset=1\n\n"+
              " If you are a student and looking for a place to stay during your study, please reply 'student' "
      }

     if (text.includes('student') ||
         text.includes('dorm') ||
         text.includes('dormitory') ||
         text.includes('private') ||
         text.includes('share') ||
         text.includes('public') ||
         text.includes('wg')) {
          session.topic = 'studdor';
         }

      if (
         session.topic == 'studdor' &&
         text.includes('student') &&
         !text.includes('dorm') &&
         !text.includes('private') &&
         !text.includes('share') &&
         !text.includes('public') &&
         !text.includes('wg')

      ) { 
         return "Finding a place to stay in Deggendorf is very important for students.\n\n" +
           "You can apply for dormitories or private offers.\n\n" +
           "Which would you like to know more about?\n\n" +
           "• Dormitory\n" +
           "• Private Accommodation\n" +
           "• Public Websites";
      }

      if (
           session.topic === 'studdor' &&
           (text.includes('student dormitory') ||
            text.includes('dorm'))
      ) {
           return "All apartments are located within easy walking distance of Deggendorf town and the campus of DIT.\n\n" +
           "View your options here:\n\n" +
           "https://www.th-deg.de/accommodation#deggendorf";
      }

      if (
          session.topic === 'studdor' &&
          (text.includes('private') ||
           text.includes('share'))
      ) {
          return "DIT has its own flat exchange platform where students and landlords offer apartments for sublease or permanent rent.\n\n" +
           "Flat Exchange:\n" +
           "https://pmit-ext.th-deg.de/wb/search?lang=en\n\n" +
           "You can also ask about public websites.";
      } 

   if (
       session.topic === 'studdor' &&
       (text.includes('public') ||
       text.includes('wg'))
   ) {
       return "Public accommodation websites:\n\n" +
           "WG-Gesucht:\n" +
           "https://www.wg-gesucht.de/en/\n\n" +
           "Ebay Kleinanzeigen:\n" +
           "https://www.ebay-kleinanzeigen.de/simmobilien/94469/c195l16909\n\n" +
           "Immobilienscout24:\n" +
           "https://www.immobilienscout24.de/wohnen/bayern,deggendorfkreis/wohnungen.html";
   }     

   if (fromIntent) {
      if (session.topic === 'studdor') {
         return "Finding a place to stay in Deggendorf is very important for students.\n\n" +
                "You can apply for dormitories or private offers.\n\n" +
                "Which would you like to know more about?\n\n" +
                "• Dormitory\n" +
                "• Private Accommodation\n" +
                "• Public Websites";
      }

        session.topic = 'hotel';

      return "Welcome to Deggendorf! Most accommodations in Deggendorf can be found in our booking portal:\n\n" +
             " https://tportal.tomas.travel/StadtDeggendorf/ukv?globalreset=1\n\n" +
             " If you are a student and looking for a place to stay during your study, please reply 'student' ";
       }

   return null;
}

/*Restaurant*/
function Restaurant (text, session, fromIntent = false){
        if (text.includes('restaurant')||
          text.includes('food')||
          text.includes('meal')||
          text.includes('dinner')||
          text.includes('breakfast')||
          text.includes('lunch')||
          text.includes('eat')||
          text.includes('pizza') ||
          text.includes('pasta') ||
          text.includes('burger')||
          text.includes('cafe')||
          text.includes('hungry') ||
          text.includes('cuisine') ||
          text.includes('coffee')||
          text.includes('indian')||
          text.includes('mensa')||
          text.includes('italian')||
          text.includes('german')||
          text.includes('syrian')||
          text.includes('turkish') ||
          text.includes('restaurant near me') ||
          text.includes('where to eat') ||
          text.includes('good food') ||
          text.includes('takeaway') ||
          text.includes('take away') ||
          text.includes('delivery')) {
            
            session.topic = 'restaurant';
         }

      if(session.topic === 'restaurant'&&
             (text.includes('indian')||text.includes('curry'))
            )
             {return "For indian food in Deggendorf,you can try Taj Mahal or Shiva\n\n" +
                      "Taj Mahal:  https://tajmahaldeggendorf.de/de \n\n"+
                      "Shiva: https://www.indisches-restaurant-deggendorf.de/\n\n" 
             }
         
      if(session.topic === 'restaurant'&&
        (text.includes('mensa')||text.includes('student')||text.includes('campus'))
        )
        {return "For students, the Mensa at THD is a good option. You can check THD information here\n\n"+
                "THD: https://www.th-deg.de/"
        }
 
        if(session.topic === 'restaurant'&&
          (text.includes('syrian')||text.includes('arabic')||text.includes('shawarma'))
          )
          {return "For Syrian Food or Arabic Food in Deggendorf, it is best to search current options here\n\n"+
                  "Google Maps: https://www.google.com/maps/search/syrian+restaurant+Deggendorf"
          }

        if(session.topic === 'restaurant'&&
           (text.includes('turkish')||text.includes('kebab')||text.includes('doner')||text.includes('döner'))
          )
          {return "For Turkish Food or döner in Deggendorf, you can check Ankara Grill or search here\n\n"+
                  "Ankara Grill: https://www.tripadvisor.com/Restaurant_Review-g811095-d23507287-Reviews-Ankara_Grill-Deggendorf_Lower_Bavaria_Bavaria.html\n\n"+
                  "Google Maps:  https://www.google.com/maps/search/turkish+restaurant+Deggendorf"
          }



      if (session.topic == 'restaurant' &&
          (text.includes('asia')||
           text.includes('chinese')||
           text.includes('china')||
           text.includes('japan')||
           text.includes('sushi')||
           text.includes('hong kong'))
         )
         {return "There are some Asian food restaurant worth to try:\n\n"+
                 "Hai Pai Cuisine: https://haipaicuisine.de/\n\n"+
                 "Sen Resraurant: https://www.sen-deggendorf.de/\n\n"+
                 "SAIKYO Restaurant - Asian Fusion & Sushi: https://www.saikyo.de/ \n\n"
         }

      if (session.topic === 'restaurant' &&
          (text.includes ('italian')||
           text.includes('pasta')||
           text.includes('pizza')
          ))
          {return "There are some Italy restaurant worth to try:\n\n"+
                  "Laurin - Pasta & Pizza: https://www.laurin-deggendorf.de/\n\n"+
                  "Mama Mia Da Max : https://mamamia-max.de/" 
          }
      
      if (session.topic === 'restaurant' &&
          (text.includes ('local')||
           text.includes ('german')||
           text.includes ('traditional')||
           text.includes ('bavarian')||
           text.includes ('european'))
         )
         {return "Here are top 3 restaurants of german style in Deggendorf (according to Tripadvisor):\n\n"+
                 "Gasthaus Zur Knodelwerferin: https://www.knoedelwerferin-deggendorf.de/\n\n"+
                 "Hotel Gasthof Hottl: https://www.hoettl.de/\n\n"+
                 "Schober Otto Gaststaette: https://www.schober-otto.de/\n\n"
         }

      if (session.topic === 'restaurant' &&
          (text.includes ('cafe')||
           text.includes ('tea')||
           text.includes ('snack')||
           text.includes ('cake')||
           text.includes ('coffee')||
           text.includes ('tea')||
           text.includes ('break'))
         )
         {return "There are many cafés and coffee shops in Deggendorf where you can enjoy coffee, tea, and snacks.\n\n" +
                 "Most cafés are located in the city center and shopping areas."
         }

      if (session.topic === 'restaurant' &&
          (text.includes ('fast')||
           text.includes ('burger')||
           text.includes ('fried')||
           text.includes ('sandwich'))
         )
         {return "We have McDonald's, Subway, Kochloffel and Burger King in Deggendorf."
         }

       if (text.includes('restaurant')||
          text.includes('food')||
          text.includes('meal')||
          text.includes('dinner')||
          text.includes('breakfast')||
          text.includes('lunch')||
          text.includes('eat')||
          text.includes('pizza') ||
          text.includes('pasta') ||
          text.includes('burger')||
          text.includes('cafe')||
          text.includes('hungry') ||
          text.includes('cuisine') ||
          text.includes('coffee')||
          text.includes('indian')||
          text.includes('mensa')||
          text.includes('italian')||
          text.includes('german')||
          text.includes('syrian')||
          text.includes('turkish')
         )
         {return "Deggendorf has many food options.\n\n" +
                 "Available categories:\n\n" +
                 "• Indian\n" +
                 "• Italian\n" +
                 "• Mensa\n" +
                 "• German\n" +
                 "• Syrian\n" +
                 "• Turkish\n\n" +
                 "Which one would you like?";}

         if (fromIntent) {
           session.topic = 'restaurant';

        return "Deggendorf has many food options.\n\n" +
             "Available categories:\n\n" +
             "• Indian\n" +
             "• Italian\n" +
             "• Mensa\n" +
             "• German\n" +
             "• Syrian\n" +
             "• Turkish\n\n" +
             "Which one would you like?";
            }

      return null;
 }


 /*School & THD*/
function School (text,session, fromIntent = false){
        if (text.includes('school')||
            text.includes('education')||
            text.includes('college')||
            text.includes('study')||
            text.includes('thd')||
            text.includes('dit')||
            text.includes('technology')||
            text.includes('applied sciences')||
            text.includes('university')||
            text.includes('uni')||
            text.includes('introduce thd')||
            text.includes('introduce university') ||
            text.includes('th deg') ||
            text.includes('deggendorf institute of technology') ||
            text.includes('degree') ||
            text.includes('bachelor') ||
            text.includes('master') ||
            text.includes('campus') ||
            text.includes('lecture') ||
            text.includes('semester') ||
            text.includes('student card') ||
            text.includes('enrollment') ||
            text.includes('enrolment') ||
            text.includes('admission') ||
            text.includes('application')
         ) {
            session.topic = 'school'
         }
           
          /*THD*/ 
          if (session.topic === 'school' &&
             (text.includes('university')||
              text.includes('thd')||
              text.includes('dit')||
              text.includes('applied sciences')||
              text.includes('technology'))
           )
           {session.topic = 'thd'}

             if (session.topic === 'thd' &&
                ( text.includes('introduce')||
                text.includes('thd')||
                text.includes('dit')||
                text.includes('where')||
                text.includes('loca')))
           
                {return "The Deggendorf Institute of Technology (THD) offers Bachelor's and Master's degree programmes in the fields of civil and environmental engineering, natural sciences, electrical engineering and computer science, mechanical engineering, media as well as health and economics\n\n"+
                   "The THD has 45% international students. 3 study locations. The main campus of THD is located in the center of Deggendorf.\n\n"+
                   "Location: Dieter-Görlitz-Platz 1, 94469 Deggendorf"
                }

             if (session.topic === 'thd' &&
                (text.includes('program') ||
                 text.includes('graduate') ||
                 text.includes('degree') ||
                 text.includes('bachelor') ||
                 text.includes('master')))

                {return "Here you can find all study programmes at THD: https://www.th-deg.de/study-programmes"}

              if (session.topic === 'thd' &&
                (text.includes('apply') ||
                 text.includes('join') ||
                 text.includes('admission') ||
                 text.includes('application')))

                {return "To begin your studies at the Deggendorf Institute of Technology, you need to apply to study.\n\n"+
                     "Step by step to a successful application from here: https://th-deg.de/en/apply"
                }


             if (session.topic === 'thd' &&
                (text.includes('event') ||
                 text.includes('activity') ||
                 text.includes('party')||
                 text.includes('club')))

                {return "THD is holding a variety of activities, including diversity week, international week, online consultation, career development, sports, party, cinema night, etc.\n\n"+
                "Here you can find event calendar here: https://th-deg.de/en/dit/events"}
            
             if (session.topic === 'thd' &&
                (text.includes('contact') ||
                 text.includes('email') ||
                 text.includes('phone')||
                 text.includes('advice')||
                 text.includes('support')))

                {return "If you need any advice or support, you can reach us from here: https://th-deg.de/en/advice"
                } 
           

        if (text.includes('school')||
            text.includes('education')||
            text.includes('college')||
            text.includes('study'))
  
            {return "In the district of Deggendorf, probably one of the most school-friendly in Bavaria, there are almost 80 state, municipal and private institutions for the training, further education and further education of the population in school and work\n\n"+
               "There are schools of general education, Vocation schools, adult education, technical colleges, primary and secondary schools, university, continuing education and special schools\n\n" +
               "For more information, please click: https://www.landkreis-deggendorf.de/leben-arbeiten/bildung/schulen-weiterbildung/"}

         if (
          text.includes('school') ||
          text.includes('education') ||
          text.includes('college') ||
          text.includes('study') ||
          fromIntent
       )  {
         return "In the district of Deggendorf, probably one of the most school-friendly in Bavaria, there are almost 80 state, municipal and private institutions for the training, further education and further education of the population in school and work\n\n" +
             "There are schools of general education, Vocation schools, adult education, technical colleges, primary and secondary schools, university, continuing education and special schools\n\n" +
             "For more information, please click: https://www.landkreis-deggendorf.de/leben-arbeiten/bildung/schulen-weiterbildung/";
       }

     return null;

}

 
 /*Activity & sightseeing*/
function Activity (text, session, fromIntent = false) {
   if (text.includes('activity') ||
       text.includes('event')||
       text.includes('festival')||
       text.includes('concert')||
       text.includes('show')||
       text.includes('happening')||
       text.includes('activities')||
       text.includes('exchange')||
       text.includes('exhibition')||
       text.includes('free time')||
       text.includes('leisure')||
       text.includes('fun')||
       text.includes('hike')||
       text.includes('hiking')||
       text.includes('cycling')||
       text.includes('park')||
       text.includes('nature')||
       text.includes('ski')||
       text.includes('bike')||
       text.includes('family')||
       text.includes('fish')||
       text.includes('picnic')||
       text.includes('camp')||
       text.includes('golf')||
       text.includes('dsc')||
       text.includes('ice')||
       text.includes('tour')||
       text.includes('motor')||
       text.includes('skat')||
       text.includes('what can i do')||
       text.includes('what can we do')||
       text.includes('things to do')||
       text.includes('do in deggendorf')||
       text.includes('sport')||
       text.includes('activities')||
       text.includes('bored'))

       {session.topic = 'activity'}

       if (session.topic === 'activity' &&
           text.includes('fish'))
           {return "Fishing enthusiasts will find optimal conditions in lakes and river of deggendorf\n\n"+
                    "Further information and booking options can be found on here:https://angeln-in-deggendorf.de/"
           }

           
       if (session.topic === 'activity' &&
           (text.includes('camp')||
           text.includes('motorhome')))
           {return "We have four campsite for you:\n\n"+
                   "Campsite Donaustrandhaus, located Eginger Str. 42, 94469 Deggendorf. Tel: 0991 4324\n\n"+
                   "Camping on the farm: Tel: 0991 22027\n\n"+
                   "Motorhome pitches, located Sandnerhofweg 4-6, 94469 Deggendorf. Tel: 0991 28960\n\n"+
                   "Motorhome pitches in the Danube Park, located Neusiedler Str. corner of Ackerloh. 5 free parking space without equipment and can be used all year around.\n\n"
           }

        if (session.topic ==='activity' &&
            (text.includes('walk')||
             text.includes('hike')||
             text.includes('hiking')||
             text.includes('trail')||
             text.includes('route'))
           )
           {return "Deggendorf is located at the foot of the Bavarian Forest. With this ideal location, the Danube town of Deggendorf is considered the 'gateway of Bavarian Forest'.\n\n"+
                   "Here are top 9 hiking routes in Deggendorf, click the link to know more:\n\n"+
                   "1. Danube Panorama Trail: https://deggendorf.travel/freizeit/wandern/donaupanoramaweg \n\n"+
                   "2. Circular hiking trail Greising: https://deggendorf.travel/freizeit/wandern/rundwanderweg-greising \n\n"+
                   "3. Destination hiking trail Landshuter Haus: https://deggendorf.travel/freizeit/wandern/zielwanderweg-muehlbogen \n\n"+
                   "4. Muhlbogen circular hiking trail: https://deggendorf.travel/freizeit/wandern/rundwanderweg-muehlbogen \n\n"+
                   "5. Circular hiking trail Deggendorf- Kulturviertel: https://deggendorf.travel/freizeit/wandern/rundwanderweg-deggendorf-kulturviertel \n\n"+
                   "6. Ruselabsatz Hiking Trail: https://deggendorf.travel/freizeit/wandern/zielwanderweg-ruselabsatz \n\n"+
                   "7. Circular hiking trail Leoprechtstein: https://deggendorf.travel/freizeit/wandern/rundwanderweg-leoprechtstein \n\n"+
                   "8. Seebach circular hiking trail: https://deggendorf.travel/freizeit/wandern/rundwanderweg-seebach \n\n"+
                   "9. Destination hiking trail Franzosenweg: https://deggendorf.travel/freizeit/wandern/zielwanderweg-franzosenweg \n\n" +
                   "You can find more here: https://deggendorf.travel/freizeit/wandern"
            }

 
        if (session.topic === 'activity' &&
            (text.includes('park') ||
             text.includes('picnic'))
        )
        {return "These two parks are highly recommended:\n\n"+
                "Stadtpark: https://www.deggendorf.de/veranstaltungen/ort/stadtpark \n\n" +
                "Donaupark Deggendorf: https://www.bayerischer-wald.de/attraktion/donaupark-deggendorf-d85ad3641c"
        }

        if (session.topic === 'activity' &&
            text.includes('golf'))
            {return "In Deggendorf you can improve your handicap on one of the highest golf courses in southern Bavaria.\n\n"+
                    "Golf Courses in Deggendorf: Miniature golf course, Am Stadtpark 42. Tel: 0991 29793934\n\n"+
                    "For more detail: https://www.deggendorfer-golfclub.de/"
            }

        if (session.topic === 'activity' &&
            (text.includes('bike')||
             text.includes('cycle')||
             text.includes('bicycle'))||
             text.includes('cycling')
           )
           {return "Whether leisurely family bike tours, sport bike tours or challenging two-wheeler tours and fitness pedal knights\n\n"+
                   "the many cycle paths in and around Deggendorf will make every 'cyclist's heart' beat faster.\n\n"+
                   "Here are most popular cycling routes, click the link to know more:\n\n"+
                   "Danube Cycle Path: https://deggendorf.travel/freizeit/radfahren/donauradweg \n\n"+
                   "Isar Cycle Path: https://deggendorf.travel/freizeit/radfahren/isarradweg \n\n"+
                   "Cycling in and around Deggendorf: https://deggendorf.travel/freizeit/radfahren/stadtradeln \n\n"+
                   "Danube IIz Cycle Path: https://deggendorf.travel/freizeit/radfahren/donau-ilz-radweg \n\n"+
                   "For more information, please check from here: https://deggendorf.travel/freizeit/radfahren"
           }  
           
        if (session.topic === 'activity' &&
            (text.includes('ice')||
             text.includes('skat')||
             text.includes('hockey')||
             text.includes('dsc')||
             text.includes('winter'))
           )
           {return "There are plenty of fun for cold and winter at Deggendorf ice stadium. For example: classic ice skating, disco or themed ice skating \n\n" +
                   "And Our Deggendorf ice hockey games are always worth a visit. Come and support our Deggendorfer SC \n\n"+
                   "Click here to know more: https://eisstadion.deggendorf.de/"
           }  

    if (text.includes('activity') ||
       text.includes('event')||
       text.includes('festival')||
       text.includes('concert')||
       text.includes('show')||
       text.includes('happening')||
       text.includes('exchange')||
       text.includes('exhibitions')||
       text.includes('free time')||
       text.includes('leisure')||
       text.includes('fun')||
       text.includes('nature')||
       text.includes('family')||
       text.includes('tour')||
       text.includes('motor')||
       text.includes('what can i do')||
       text.includes('things to do')||
       text.includes('activities')||
       text.includes('bored') ||
       text.includes('do in deggendorf'))

       {return "There are a variety of activities in Deggendorf, including family activities, concerts, culture events,hiking, cycling, ski, golf and picnic.\n\n"+
               "What would you like to know more?\n\n"+
               "You can find more details through our website: https://www.deggendorf.de/veranstaltungen "
           }

    if (
      text.includes('activity') ||
      text.includes('event') ||
      text.includes('festival') ||
      text.includes('concert') ||
      text.includes('show') ||
      text.includes('happening') ||
      text.includes('exchange') ||
      text.includes('exhibitions') ||
      text.includes('free time') ||
      text.includes('leisure') ||
      text.includes('fun') ||
      text.includes('nature') ||
      text.includes('family') ||
      text.includes('tour') ||
      text.includes('motor') ||
      text.includes('what can i do') ||
      text.includes('things to do') ||
      text.includes('activities') ||
      text.includes('bored') ||
      text.includes('do in deggendorf') ||
      text.includes('play') ||
      text.includes('game') ||
      text.includes('games') ||
      fromIntent
   ) {
      return "There are a variety of activities in Deggendorf, including family activities, concerts, culture events,hiking, cycling, ski, golf and picnic.\n\n" +
             "What would you like to know more?\n\n" +
             "You can find more details through our website: https://www.deggendorf.de/veranstaltungen ";
   }

   return null;

}

/*City Registration Details*/
function CityRegistration(text,session, fromIntent = false) {
        if (text.includes('city registration')||
            text.includes('register address')||
            text.includes('address registration')||
            text.includes('anmeldung')||
            text.includes('meldebescheinigung')||
            text.includes('bürgeramt')||
            text.includes('buergeramt')||
            text.includes('resident registration')||
            text.includes('resident registration')||
            text.includes('new address'))
        {
                session.topic = 'registration';

                return "For city registration in Deggendorf, you need to register your address at the Bürgeramt after moving in.\n\n" +
                       "Basic steps:\n\n" +
                       "1. Move into your apartment first.\n" +
                       "2. Book an appointment with the Bürgeramt\n" + 
                       "3. Bring your passport or ID card.\n" +
                       "4. Bring your landlord confirmation form here, called Wohnungsgeberbestätigung.\n" +
                       "5. Go to the Bürgeramt in person and sign the registration form there.\n\n" +
                       "Official Information:  https://www.deggendorf.de/rathaus/rechts-ordnungsverwaltung/buergeramt/wohnsitz-anmelden.\n\n" +
                       "You can also ask me about required documents, appointment or locaton.";
        }

        if (session.topic === 'registration' &&
            (text.includes('document')||
             text.includes('bring')||
             text.includes('required')))

        {
                return "For city registration, you usually need:\n\n" +
                       "Passport or ID card\n" +
                       "Wohnungsgeberbestätigung, which is a confirmation form from your landlord\n" + 
                       "Your new address\n\n" +
                       "The registration form is normally prepared at the Bürgeramt and signed there.";
        }

        if (session.topic === 'registration' &&
            (text.includes('appointment')||
             text.includes('termin') ||
             text.includes('book')))
        
        {
                return "You can book an appointment online with the City of Deggendorf here:\n\n" +
                       "https://termine-reservieren.de/termine/deggendorf/";
        }

        if (session.topic === 'registration' &&
            (text.includes('where')||
             text.includes('location')||
             text.includes('address')))

         {
            return "City registration is handled by the Bürgeramt Deggendorf.\n\n" +
                   "You can find the official Bürgeramt information here.\n\n" +
                   "https://www.deggendorf.de/rathaus/rechts-ordnungsverwaltung/buergeramt";
         }

      if (fromIntent) {
         session.topic = 'registration';

      return "For city registration in Deggendorf, you need to register your address at the Bürgeramt after moving in.\n\n" +
             "Basic steps:\n\n" +
             "1. Move into your apartment first.\n" +
             "2. Book an appointment with the Bürgeramt\n" +
             "3. Bring your passport or ID card.\n" +
             "4. Bring your landlord confirmation form here, called Wohnungsgeberbestätigung.\n" +
             "5. Go to the Bürgeramt in person and sign the registration form there.\n\n" +
             "Official Information:  https://www.deggendorf.de/rathaus/rechts-ordnungsverwaltung/buergeramt/wohnsitz-anmelden.\n\n" +
             "You can also ask me about required documents, appointment or locaton.";
     }

     return null;
}

/*Police*/
function Emergency(text,session, fromIntent = false){
   if (text.includes('police')||
       text.includes('polizei')||
       text.includes('police station')||
       text.includes('lost item')||
       text.includes('theft')||
       text.includes('stolen')||
       text.includes('crime')||
       text.includes('emergency')||
       text.includes('emergency numbers'))
   
   {
      session.topic = 'emergency';

      return "For police help in Deggendorf, you can contact Polizeiinspektion Deggendorf.\n\n" +
             "Address: Hans-Krämer-Straße 65, 94469 Deggendorf.\n" +
             "Phone: +49 991 3896-0\n\n" +
             "In an emergency, call 110 for police.\n" + 
             "For medical or fire emergency, call 112.\n\n" +
             "You can ask me about emergency, lost items, theft or police station locaation.";
   }

   if (session.topic === 'emergency' &&
        (text.includes('urgent')||
        text.includes('danger')))
   {
      return "If you are in immediate danger, call 110 for police emergency in Germany.\n\n" +
             "For ambulance or fire brigade, call 112.";
   }

   if (session.topic === 'emergency' &&
       (text.includes('location')||
        text.includes('where')||
        text.includes('address')))
   
   {
      return "The police station in Deggendorf is:\n\n" + 
             "Polizeinspektion Deggendrof\n" +
              "Hans-Krämer-Straße 65\n" +
              "94469 Deggendorf\n\n" +
              "Phone: +49 991 3896 0";
   }

   if (session.topic === 'emergency' &&
       (text.includes('lost')||
        text.includes('stolen')||
        text.includes('theft')))
   
   {
      return "If something is stolen, you should connect with the police\n\n" +
             "For lost items, you can also ask the city lost and found office, called Fundbüro\n\n" + 
             "If it is urgent, call 110";
   }

    if (fromIntent) {
      session.topic = 'emergency';

      return "For police help in Deggendorf, you can contact Polizeiinspektion Deggendorf.\n\n" +
             "Address: Hans-Krämer-Straße 65, 94469 Deggendorf.\n" +
             "Phone: +49 991 3896-0\n\n" +
             "In an emergency, call 110 for police.\n" +
             "For medical or fire emergency, call 112.\n\n" +
             "You can ask me about emergency, lost items, theft or police station locaation.";
   }

   return null;

}

function NearbyCities(text,session, fromIntent = false){
   if (
      text.includes('nearby city')||
      text.includes('nearby cities')||
      text.includes('cities near deggendorf')||
      text.includes('visit from deggendorf')||
      text.includes('day trip')||
      text.includes('places near deggendorf')||
      text.includes('where can i go from deggendorf')||
      text.includes('travel from deggendorf hbf')||
      text.includes('deggendorf hbf')
   ){
      session.topic = 'nearbycities';
      
      return "From Deggendorf HBF, you can visit several nearby cities by train or bus:\n\n" +
             "1. Plattling - about 10 minutes by regional train\n" +
             "Travel: Take RB35 from Deggendorf Hbf to Plattling.\n\n" +
             "2. Passau - about 45 to 60 minutes\n" + 
             "Travel: Take the train from Deggendorf to Plattling, then change to a train to Passua\n\n" + 
             "3. Regensburg - about 60 to 90 minutes\n" + 
             "Travel: Take the train from Deggendorf to Plattling, then change to a train to Regensburg\n\n" + 
             "4. Munich - about 2 to 2.5 hours\n" + 
             "Travel: Take the train from Deggendorf to Plattling, then change to a train to Munich\n\n" + 
             "5. Landshut - about 75 to 90 minutes\n" + 
             "Travel: Take the train from Deggendorf to Plattling, then change to a train to Landshut\n\n" + 
             "6. Straubing - about 40 to 60 minutes\n" + 
             "Travel: Take the train from Deggendorf to Plattling, then change to a train to Straubing\n\n" +
             "For exact times and tickets, check Deutsche Bahn:\n" + 
             "https://www.bahn.de/service/fahrplaene/reiseauskunft\n\n" +
             "Which city would you like to know more about?";

   }

      if (session.topic == 'nearbycities' &&
       text.includes('plattling'))
   {
      return "Plattling is the closet major railway connection from Deggendorf.\n\n" + 
             "Time: about 10 minutes by RB35 train.\n " + 
             "Good For: Train connections, short visit, changing ot ICE or regional trains.";
   }

   if (session.topic == 'nearbycities' &&
       text.includes('passau'))
   {
      return "Passau is a beautiful city known as the Three Rivers City.\n\n" + 
             "Time: about 45 to 60 minutes.\n" + 
             "Travelling: Deggendorf Hbf → Plattling → Passau Hbf";
   }

   if (session.topic == 'nearbycities' &&
       text.includes('regensburg'))
   {
      return "Regensburg is a historic city and a good day trip from Deggnedorf.\n\n" + 
             "Time: about 60 to 90 minutes.\n" + 
             "Travel: Deggendorf Hbf → Plattling → Regensburg Hbf";
   }

   if (session.topic == 'nearbycities' &&
       text.includes('munich'))
   {
      return "Munich is possible as a longer day trip from Deggendorf.\n\n" + 
             "Time: about 2 to 2.5 hours.\n" + 
             "Travel: Deggendorf Hbf → Plattling → München Hbf";
   }

   if (session.topic == 'nearbycities' &&
       text.includes('landshut'))
   {
      return "Landshut is a nice Bavarian City to visit from Deggendorf.\n\n" + 
             "Time: about 75 to 90 minutes.\n" + 
             "Travel: Deggendorf Hbf → Plattling → Landshut ";
   }

   if (session.topic == 'nearbycities'&&
       text.includes('straubing'))
   {
      return "Straubing is another nearby city, you can visit/.\n\n" +
             "Time: about 40 to 60 minutes.\n" + 
             "Travel: Deggendorf Hbf → Plattling → Straubing";
   }

   if (fromIntent) {
      session.topic = 'nearbycities';

      return "From Deggendorf HBF, you can visit several nearby cities by train or bus:\n\n" +
             "1. Plattling - about 10 minutes by regional train\n" +
             "Travel: Take RB35 from Deggendorf Hbf to Plattling.\n\n" +
             "2. Passau - about 45 to 60 minutes\n" +
             "Travel: Take the train from Deggendorf to Plattling, then change to a train to Passua\n\n" +
             "3. Regensburg - about 60 to 90 minutes\n" +
             "Travel: Take the train from Deggendorf to Plattling, then change to a train to Regensburg\n\n" +
             "4. Munich - about 2 to 2.5 hours\n" +
             "Travel: Take the train from Deggendorf to Plattling, then change to a train to Munich\n\n" +
             "5. Landshut - about 75 to 90 minutes\n" +
             "Travel: Take the train from Deggendorf to Plattling, then change to a train to Landshut\n\n" +
             "6. Straubing - about 40 to 60 minutes\n" +
             "Travel: Take the train from Deggendorf to Plattling, then change to a train to Straubing\n\n" +
             "For exact times and tickets, check Deutsche Bahn:\n" +
             "https://www.bahn.de/service/fahrplaene/reiseauskunft\n\n" +
             "Which city would you like to know more about?";
   }

   return null;
}


function PlanVisit(text, session, fromIntent = false) {
    if (
        text.includes('plan visit') ||
        text.includes('visit plan') ||
        text.includes('trip plan') ||
        text.includes('plan my trip') ||
        text.includes('plan a trip') ||
        text.includes('day plan') ||
        text.includes('itinerary') ||
        text.includes('travel plan') ||
        text.includes('trip itinerary') ||
        text.includes('schedule') ||
        text.includes('day schedule') ||
        text.includes('make a plan')
    ) {
        session.topic = 'visitplan';
        session.planStep = 'visitorType';

        session.profile = {
            visitorType: null,
            duration: null,
            accommodation: null,
            transport: null,
            food: null,
            activity: null
        };

        return "Sure, I can help you plan your visit to Deggendorf.\n\n" +
               "First, are you a student, tourist, or resident?";
    }

    if (session.topic !== 'visitplan') {
        return null;
    }

    if (text.includes('cancel') || text.includes('stop')) {
        session.topic = null;
        session.planStep = null;
        session.profile = null;

        return "Okay, I stopped the visit planning. What else would you like to know about Deggendorf?";
    }

    if (session.planStep === 'visitorType') {
        session.profile.visitorType = text;
        session.planStep = 'duration';

        return "Got it. How long will you stay in Deggendorf?\n\n" +
               "For example: one day, weekend, one week, or longer.";
    }

    if (session.planStep === 'duration') {
        session.profile.duration = text;
        session.planStep = 'accommodation';

        return "Okay. Do you need accommodation?\n\n" +
               "You can answer: hotel, student dormitory, apartment, or no.";
    }

    if (session.planStep === 'accommodation') {
        session.profile.accommodation = text;
        session.planStep = 'transport';

        return "Good. How will you travel in Deggendorf?\n\n" +
               "You can answer: walking, bus, train, car, or bicycle.";
    }

    if (session.planStep === 'transport') {
        session.profile.transport = text;
        session.planStep = 'food';

        return "Nice. What type of food do you prefer?\n\n" +
               "For example: Indian, Italian, German, Turkish, Mensa, or café.";
    }

    if (session.planStep === 'food') {
        session.profile.food = text;
        session.planStep = 'activity';

        return "Great. What activity would you like to do?\n\n" +
               "For example: sightseeing, shopping, hiking, THD visit, or nearby cities.";
    }

    if (session.planStep === 'activity') {
        session.profile.activity = text;
        session.planStep = 'done';

        return "Here is your Deggendorf visit plan:\n\n" +
               "Visitor type: " + session.profile.visitorType + "\n" +
               "Duration: " + session.profile.duration + "\n" +
               "Accommodation: " + session.profile.accommodation + "\n" +
               "Transport: " + session.profile.transport + "\n" +
               "Food preference: " + session.profile.food + "\n" +
               "Activity: " + session.profile.activity + "\n\n" +
               "Suggested plan:\n" +
               "1. Start at Deggendorf city center.\n" +
               "2. Use " + session.profile.transport + " for moving around.\n" +
               "3. Choose accommodation based on: " + session.profile.accommodation + ".\n" +
               "4. Eat at a place matching your preference: " + session.profile.food + ".\n" +
               "5. Spend time on: " + session.profile.activity + ".\n\n" +
               "Would you like to make another plan? Type 'plan visit' to start again.";
    }

    if (session.planStep === 'done') {
        if (
            text.includes('again') ||
            text.includes('new') ||
            text.includes('another') ||
            text.includes('restart')
        ) {
            session.topic = 'visitplan';
            session.planStep = 'visitorType';

            session.profile = {
                visitorType: null,
                duration: null,
                accommodation: null,
                transport: null,
                food: null,
                activity: null
            };

            return "Sure, let us make a new Deggendorf visit plan.\n\n" +
                   "Are you a student, tourist, or resident?";
        }

        return "The visit plan is complete. You can type 'plan visit' to create another plan, or ask me about transportation, restaurants, THD, activities, or accommodation.";
    }

    return null;
}

function MobileNetwork(text, session, fromIntent = false) {

   if (fromIntent) {
      session.topic = 'mobilenetwork';
   }

   if (
      text.includes('mobile') ||
      text.includes('telephone') ||
      text.includes('sim') ||
      text.includes('sim card') ||
      text.includes('simcard') ||
      text.includes('prepaid') ||
      text.includes('esim') ||
      text.includes('internet') ||
      text.includes('wifi') ||
      text.includes('phone') ||
      text.includes('cell') ||
      text.includes('data') ||
      text.includes('network')
   ) {
      session.topic = 'mobilenetwork';
   }

   if (
      session.topic === 'mobilenetwork' &&
      (
         text.includes('visitors') ||
         text.includes('visitor') ||
         text.includes('prepaid') ||
         text.includes('temporary') ||
         text.includes('short-term') ||
         text.includes('short term')
      )
   ) {
      return "You can buy a prepaid SIM card from Media Market, Telekom or Rewe. \n\n" +
             "To activate your prepaid SIM card, you need to prepare your identity document, for example, passport or residence permit.";
   }

   if (
      session.topic === 'mobilenetwork' &&
      (
         text.includes('residence') ||
         text.includes('resident') ||
         text.includes('contract') ||
         text.includes('student') ||
         text.includes('long-term') ||
         text.includes('long term')
      )
   ) {
      return "For residents or students, we recommend you to make a monthly contract plan for your mobile service.\n\n" +
             "Major mobile network providers in Germany include Telekom, Vodafone, O2 and Freenet. \n\n" +
             "Customers can visit their local stores in Deggendorf to purchase SIM cards, sign a contract or get support. \n\n" +
             "Telekom: Luitpoldplatz 16, 94469 Deggendorf\n\n" +
             "Vodafone: Oberer Staadtplatz 2, 94469 Deggendorf\n\n" +
             "O2: Oberer Stadtplatz 10, 94469, Deggendorf\n\n" +
             "Freenet: Oberer Stadtplatz 11, 94469, Deggendorf. \n\n" +
             "If you want to purchase SIM card and sign a contract, please bring following documents:\n\n" +
             "-ID card or passport and residence permit\n\n" +
             "-Registration certification (Meldebescheinigung)\n\n" +
             "-Bank card";
   }

   if (
      session.topic === 'mobilenetwork' &&
      (
         text.includes('top up') ||
         text.includes('topup') ||
         text.includes('recharge') ||
         text.includes('balance') ||
         text.includes('paid') ||
         text.includes('voucher') ||
         text.includes('credit')
      )
   ) {
      return "You can check your prepaid balance using your mobile provider's App or by dialing a USSD code.\n\n" +
             "-Telekom, Vodafone, Aldi Talk, Ja Mobile: *100# \n\n" +
             "-O2 prepaid: *101# \n\n" +
             "If the balance is too low, you can top up your balance online or by purchasing a top up voucher.\n\n" +
             "Top up vouchers are available at supermarkets, rewe, Aldi, Lidl.\n\n";
   }

   if (
      session.topic === 'mobilenetwork' &&
      (
         text.includes('recommend') ||
         text.includes('best') ||
         text.includes('provider') ||
         text.includes('prefer') ||
         text.includes('topone') ||
         text.includes('suggestion') ||
         text.includes('suggest') ||
         text.includes('coverage')
      )
   ) {
      return "Telekom generally offers the best network coverage in Germany.\n\n" +
             "Vodafone also provides excellent coverage, while O2 often has more affordable plans.\n\n" +
             "The best choice depends on your budget and data needs.\n\n";
   }

   if (session.topic === 'mobilenetwork' || fromIntent) {
      session.topic = 'mobilenetwork';

      return "There are several mobile network providers are available in Deggendorf, including Telekom, O2 and Vodafone, Ja mobile, Lidl Connect, Aldi Talk.\n\n" +
             "Visitors can purchase prepaid SIM cards, while students and long-term residents may prefer monthly contract plans.\n\n" +
             "Which would you like to know more?";
   }

   return null;
}

function Banking(text, session, fromIntent = false) {

   if (fromIntent) {
      session.topic = 'banking';
   }

   if (
      session.topic === 'banking' &&
      (
         text.includes('sparkasse') ||
         text.includes('local bank')
      )
   ) {
      return "Sparkasse is one of the common local banks in Deggendorf.\n\n" +
             "You can ask them about opening a bank account, student account options, debit card, online banking and monthly fees.\n\n" +
             "It is best to check the official Sparkasse Deggendorf website or visit a branch for the newest requirements.";
   }

   if (
      session.topic === 'banking' &&
      (
         text.includes('vr bank') ||
         text.includes('volksbank')
      )
   ) {
      return "VR Bank is another local banking option in Deggendorf.\n\n" +
             "They may offer current accounts, cards, online banking and student banking services.\n\n" +
             "Please check the official VR Bank website or visit a branch for exact details.";
   }

   if (
      session.topic === 'banking' &&
      (
         text.includes('blocked account') ||
         text.includes('blocked bank account') ||
         text.includes('blocked') ||
         text.includes('sperrkonto')
      )
   ) {
      return "A blocked account is often required for international students to prove financial resources for a German visa.\n\n" +
             "Common blocked account providers include:\n\n" +
             "• Fintiba\n" +
             "• Expatrio\n" +
             "• Coracle\n\n" +
             "Please always check the official visa requirements before choosing a provider.";
   }

   if (
      session.topic === 'banking' &&
      (
         text.includes('online bank') ||
         text.includes('online banks') ||
         text.includes('n26') ||
         text.includes('wise') ||
         text.includes('revolut')
      )
   ) {
      return "Some students use online banks such as N26, Wise or Revolut.\n\n" +
             "Online banks can be useful because registration is often digital and faster.\n\n" +
             "But before using an online bank for official purposes, check if it is accepted for your visa, salary, rent or university needs.";
   }

   if (
      session.topic === 'banking' &&
      (
         text.includes('documents') ||
         text.includes('document') ||
         text.includes('needed') ||
         text.includes('requirements') ||
         text.includes('passport')
      )
   ) {
      return "To open a bank account in Germany, you may need:\n\n" +
             "• Passport or ID card\n" +
             "• German address / registration certificate\n" +
             "• Student certificate or admission letter\n" +
             "• Tax ID, if already available\n" +
             "• Residence permit or visa, depending on the bank\n\n" +
             "The exact documents can be different for each bank.";
   }

   if (
      session.topic === 'banking' &&
      (
         text.includes('fee') ||
         text.includes('fees') ||
         text.includes('cost') ||
         text.includes('monthly')
      )
   ) {
      return "Bank account fees depend on the bank and account type.\n\n" +
             "Some student accounts may be free, while other accounts may have monthly fees.\n\n" +
             "Always check:\n\n" +
             "• Monthly fee\n" +
             "• Card fee\n" +
             "• Cash withdrawal fee\n" +
             "• International transfer fee";
   }

   if (
      text.includes('bank') ||
      text.includes('banking') ||
      text.includes('bank account') ||
      text.includes('open account') ||
      text.includes('open bank account') ||
      text.includes('student bank') ||
      fromIntent
   ) {
      session.topic = 'banking';

      return "There are several banking options in Deggendorf.\n\n" +
             "Students can usually choose between local banks and online banks.\n\n" +
             "Common options are:\n\n" +
             "• Sparkasse\n" +
             "• VR Bank\n" +
             "• Deutsche Bank\n" +
             "• Online banks such as N26, Wise or Revolut\n\n" +
             "If you are an international student, you may also need a blocked account for visa purposes.\n\n" +
             "What would you like to know more about?\n\n" +
             "• Sparkasse\n" +
             "• Blocked account\n" +
             "• Online banks\n" +
             "• Documents needed";
   }

   return null;
}


function HardFallback(session){
        session.failCount++;

        if (session.failCount >=3) {
                session.failCount = 0;
                session.topic = null;

                return "I am still having trouble understanding..\n\n"+
                "Let's start over.\n\n" +
                "What would you like to know about Deggendorf?\n\n" +
                "• Transportation\n" +
                "• Weather\n" +
                "• Shopping\n" +
                "• Restaurants\n" +
                "• THD\n" +
                "• Mobile Network\n" +
                "• Banking\n" +
                "• Healthcare\n" +
                "• Nearby Cities\n" +
                "• Activities";
                
        }

        return "I am sorry, I'm not sure if I understand what you're looking for.Could you please try it again with a few words? \n\n"+
                "Or you can find us by phone: +49 991 2960 5055 or send us a email: tourismus@deggendorf.de. We will be very happy to help you! :-)"
}

module.exports = { replyTopic };

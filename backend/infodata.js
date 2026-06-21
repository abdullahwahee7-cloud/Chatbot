/*We are using the keywords strategy to insure the bot understand and reply the message*/

/*The topics*/
function replyTopic (message, session){
   const text = message.toLowerCase();

   session.failCount = session.failCount || 0;

   const reply = 
      Greeting(text, session) ||
      Basicinfo(text, session) ||
      Weather(text,session) ||
      Historyinfo (text,session) ||
      Transportation (text,session) ||
      Shopping (text,session) ||
      Healthcare (text,session) ||
      Accomdation (text,session) ||
      Restaurant (text,session) ||
      Activity (text,session) ||
      Banking(text, session) ||
      MobileNetwork(text, session) ||
      School (text,session);

   if (reply) {
        session.failCount = 0;
        return reply;
   }

   return HardFallback(session);
}

/*Greeting*/
function Greeting (text,session) {

   if (
    text.includes('who are you') ||
    text.includes('what are you') ||
    text.includes('are you a bot')
    )
    {
    return "I am a chatbot representing the City of Deggendorf.\n\n" +
           "I can provide information about transportation, weather, shopping, accommodation, restaurants, activities, healthcare, education and THD.";
    }

    if (text.includes('hello') ||
       text.includes('hallo') ||
       text === 'hi'||
       text.includes('hey')||
       text.includes('guten morgen')||
       text.includes('good morning')||
       text.includes('good afternoon')||
       text.includes('good evening')||
       text.includes('greetings')
       )
       {
        return "Hello! Welcome to Deggendorf. What do you want to know about our beautiful city?\n\n"+
               "You can ask me about basic infomation of Deggendorf, the history, weather, transportation, shopping, tourism, accomdations, restaurants, local events, education insitituation and healthcare"
       }
}

/*Basic information */
function Basicinfo(text,session){

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

    if (session.topic == 'basicinfo' &&
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

     if (session.topic == 'basicinfo' &&
         (text.includes('post') ||
         text.includes('zip')||
         text.includes('zipcode'))
       )
       {return "The zipcode of Deggendorf is 94469"
       } 
         
     if (session.topic == 'basicinfo' &&
       (text.includes('population') ||
        text.includes('how many people') ||
        text.includes('how many residents'))
       )

       {return "Deggendorf's 2026 population is now estimated at 36,590."
       } 

    if (session.topic == 'basicinfo' &&
        (text.includes('government')||
        text.includes('office')||
        text.includes('new here'))
       )
       {return "Welcome to Deggendorf. https://www.deggendorf.de is the offical internet Portal for Deggendorf. You can find useful information here. "}
}
       
/*Climate*/
function Weather (text, session){

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
}

/*History*/
function Historyinfo(text,session){   
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
}

/*Transportation*/
function Transportation (text,session) {
   if (text.includes('how to get to deggendorf?')||
       text.includes('travel')||
       text.includes('transportation')||
       text.includes('how to arrive to deggendorf')||
       text.includes('how do i get there')||
       text.includes('how can i get there')||
       text.includes('how do i travel')||
       text.includes('how can i travel')

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

      if (session.topic == 'transportation' &&
          (text.includes('car') ||
           text.includes('auto'))
          )
         {return "A3: Cologne - Frankfurt - Nuremberg - Regensburg - Deggendorf\n\n"+
                 "A92: Munich - Deggendorf"
         }

      if (session.topic == 'transportation' &&
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

      if (session.topic == 'transportation' &&
         (text.includes ('bus') && !text.includes ('citybus'))
         )
         {return "You can reach Deggendorf by FlixBus from many cities,\n\n"+
                "for ticket booking please check: https://www.flixbus.com/bus/deggendorf"
         }
        
      if (session.topic == 'transportation' &&
         (text.includes ('plane'))
         )
         {return "Deggendorf is located about 100km (about 1 hour's drive) from the Franz-Josef-Strauss airport in Munich."
         }
      
      if (session.topic == 'transportation' &&
          text.includes('parking')
         )
         {return "With over 1500 parking spaces, shopping and strolling without parking stress,\n\n"+
                 "inexpensive and protected from the weather, central and no time limit.\n\n" +
                 "Simply follow our parking guidance system: https://stadtparken-deggendorf.de/?article_id=4"
         }

      if (session.topic == 'transportation' &&
          (text.includes ('citybus'))
         )
         {return "With four lines in the city bus service, we can transport you across the city area!\n\n"+
                 " Timetables and network map can be found : https://www.deggendorf.de/leben/mobilitaet-verkehr/stadtbusverkehr" 
         }
}

 
/*Shopping*/
function Shopping (text,session) {

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
      
      if (session.topic == 'shop' &&
          (text.includes('fashion') ||
           text.includes('cloth') ||
           text.includes('beauty')||
           text.includes('make-up')||
           text.includes('store'))
          )
         {return "The city center around Luitpoldplatz offers a variety of shops." +
                 " For example: Tk Maxx, Tedi, Muller, H&M, New Yorker, etc."
         }

           
      if (session.topic == 'shop' &&
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
}

/*Healthcare*/
function Healthcare (text,session) {
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

      if (session.topic == 'health' &&
          text.includes('donau'))
         {return "Donau Isar Klinikum is located at Perlasberger Str. 41, 94469, Deggendorf\n\n" +
              " Phone: 0991/ 380-0\n\n"+
              " E-mail: info@donau-isar-klinikum.de" } 
}

/*Accomdation*/
function Accomdation(text, session){
   
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

    
      if (text.includes('student')) {
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
           session.topic == 'studdor' &&
           (text.includes('student dormitory') ||
            text.includes('dorm'))
      ) {
           return "All apartments are located within easy walking distance of Deggendorf town and the campus of DIT.\n\n" +
           "View your options here:\n\n" +
           "https://www.th-deg.de/accommodation#deggendorf";
      }

      if (
          session.topic == 'studdor' &&
          (text.includes('private') ||
           text.includes('share'))
      ) {
          return "DIT has its own flat exchange platform where students and landlords offer apartments for sublease or permanent rent.\n\n" +
           "Flat Exchange:\n" +
           "https://pmit-ext.th-deg.de/wb/search?lang=en\n\n" +
           "You can also ask about public websites.";
      } 

   if (
       session.topic == 'studdor' &&
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
}

/*Restaurant*/
function Restaurant (text, session){
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
          text.includes('turkish'))
          text.includes('restaurant near me') ||
          text.includes('where to eat') ||
          text.includes('good food') ||
          text.includes('takeaway') ||
          text.includes('take away') ||
          text.includes('delivery') 
         {session.topic = 'restaurant'}

      if(session.topic == 'restaurant'&&
             (text.includes('indian')||text.includes('curry'))
            )
             {return "For indian food in Deggendorf,you can try Taj Mahal or Shiva\n\n" +
                      "Taj Mahal:  https://tajmahaldeggendorf.de/de \n\n"+
                      "Shiva: https://www.indisches-restaurant-deggendorf.de/\n\n" 
             }
         
      if(session.topic == 'restaurant'&&
        (text.includes('mensa')||text.includes('student')||text.includes('campus'))
        )
        {return "For students, the Mensa at THD is a good option. You can check THD information here\n\n"+
                "THD: https://www.th-deg.de/"
        }
 
        if(session.topic == 'restaurant'&&
          (text.includes('syrian')||text.includes('arabic')||text.includes('shawarma'))
          )
          {return "For Syrian Food or Arabic Food in Deggendorf, it is best to search current options here\n\n"+
                  "Google Maps: https://www.google.com/maps/search/syrian+restaurant+Deggendorf"
          }

        if(session.topic == 'restaurant'&&
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

      if (session.topic == 'restaurant' &&
          (text.includes ('italian')||
           text.includes('pasta')||
           text.includes('pizza')
          ))
          {return "There are some Italy restaurant worth to try:\n\n"+
                  "Laurin - Pasta & Pizza: https://www.laurin-deggendorf.de/\n\n"+
                  "Mama Mia Da Max : https://mamamia-max.de/" 
          }
      
      if (session.topic == 'restaurant' &&
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

      if (session.topic == 'restaurant' &&
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

      if (session.topic == 'restaurant' &&
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
 }


 /*School & THD*/
function School (text,session){
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
          if (session.topic == 'school' &&
             (text.includes('university')||
              text.includes('thd')||
              text.includes('dit')||
              text.includes('applied sciences')||
              text.includes('technology'))
           )
           {session.topic = 'thd'}

             if (session.topic == 'thd' &&
                ( text.includes('introduce')||
                text.includes('thd')||
                text.includes('dit')||
                text.includes('where')||
                text.includes('loca')))
           
                {return "The Deggendorf Institute of Technology (THD) offers Bachelor's and Master's degree programmes in the fields of civil and environmental engineering, natural sciences, electrical engineering and computer science, mechanical engineering, media as well as health and economics\n\n"+
                   "The THD has 45% international students. 3 study locations. The main campus of THD is located in the center of Deggendorf.\n\n"+
                   "Location: Dieter-Görlitz-Platz 1, 94469 Deggendorf"
                }

             if (session.topic == 'thd' &&
                (text.includes('program') ||
                 text.includes('graduate') ||
                 text.includes('degree') ||
                 text.includes('bachelor') ||
                 text.includes('master')))

                {return "Here you can find all study programmes at THD: https://www.th-deg.de/study-programmes"}

              if (session.topic == 'thd' &&
                (text.includes('apply') ||
                 text.includes('join') ||
                 text.includes('application')))

                {return "To begin your studies at the Deggendorf Institute of Technology, you need to apply to study.\n\n"+
                     "Step by step to a successful application from here: https://th-deg.de/en/apply"
                }


             if (session.topic == 'thd' &&
                (text.includes('event') ||
                 text.includes('activity') ||
                 text.includes('party')||
                 text.includes('club')))

                {return "THD is holding a variety of activities, including diversity week, international week, online consultation, career development, sports, party, cinema night, etc.\n\n"+
                "Here you can find event calendar here: https://th-deg.de/en/dit/events"}
            
             if (session.topic == 'thd' &&
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

}

 
 /*Activity & sightseeing*/
function Activity (text, session) {
   if (text.includes('activity') ||
       text.includes('event')||
       text.includes('festival')||
       text.includes('concert')||
       text.includes('show')||
       text.includes('happening')||
       text.includes('exchange')||
       text.includes('exhibi')||
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

       if (session.topic == 'activity' &&
           text.includes('fish'))
           {return "Fishing enthusiasts will find optimal conditions in lakes and river of deggendorf\n\n"+
                    "Further information and booking options can be found on here:https://angeln-in-deggendorf.de/"
           }

           
       if (session.topic == 'activity' &&
           (text.includes('camp')||
           text.includes('motorhome')))
           {return "We have four campsite for you:\n\n"+
                   "Campsite Donaustrandhaus, located Eginger Str. 42, 94469 Deggendorf. Tel: 0991 4324\n\n"+
                   "Camping on the farm: Tel: 0991 22027\n\n"+
                   "Motorhome pitches, located Sandnerhofweg 4-6, 94469 Deggendorf. Tel: 0991 28960\n\n"+
                   "Motorhome pitches in the Danube Park, located Neusiedler Str. corner of Ackerloh. 5 free parking space without equipment and can be used all year around.\n\n"
           }

        if (session.topic =='activity' &&
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

 
        if (session.topic == 'activity' &&
            (text.includes('park') ||
             text.includes('picnic'))
        )
        {return "These two parks are highly recommended:\n\n"+
                "Stadtpark: https://www.deggendorf.de/veranstaltungen/ort/stadtpark \n\n" +
                "Donaupark Deggendorf: https://www.bayerischer-wald.de/attraktion/donaupark-deggendorf-d85ad3641c"
        }

        if (session.topic == 'activity' &&
            text.includes('golf'))
            {return "In Deggendorf you can improve your handicap on one of the highest golf courses in southern Bavaria.\n\n"+
                    "Golf Courses in Deggendorf: Miniature golf course, Am Stadtpark 42. Tel: 0991 29793934\n\n"+
                    "For more detail: https://www.deggendorfer-golfclub.de/"
            }

        if (session.topic == 'activity' &&
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
           
        if (session.topic == 'activity' &&
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
       text.includes('exhibi')||
       text.includes('free time')||
       text.includes('leisure')||
       text.includes('fun')||
       text.includes('nature')||
       text.includes('family')||
       text.includes('tour')||
       text.includes('motor')||
       text.includes('what can i do')||
       text.includes('things to do')||
       text.includes('do in deggendorf'))

       {return "There are a variety of activities in Deggendorf, including family activities, concerts, culture events,hiking, cycling, ski, golf and picnic.\n\n"+
               "What would you like to know more?\n\n"+
               "You can find more details through our website: https://www.deggendorf.de/veranstaltungen "
           }
}

/*City Registration Details*/
function CityRegistration(text,session) {
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

        if (session.topic == 'registration' &&
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

        if (session.topic == 'registration' &&
            (text.includes('appointment')||
             text.includes('termin') ||
             text.includes('book')))
        
        {
                return "You can book an appointment online with the City of Deggendorf here:\n\n" +
                       "https://termine-reservieren.de/termine/deggendorf/";
        }

        if (session.topic == 'registration' &&
            (text.includes('where')||
             text.includes('location')||
             text.includes('address')))

         {
            return "City registration is handled by the Bürgeramt Deggendorf.\n\n" +
                   "You can find the official Bürgeramt information here.\n\n" +
                   "https://www.deggendorf.de/rathaus/rechts-ordnungsverwaltung/buergeramt";
         }
}

/*Emergency*/
function Emergency(text,session){
   if (text.includes('police')||
       text.includes('polizei')||
       text.includes('police station')||
       text.includes('lost item')||
       text.includes('theft')||
       text.includes('stolen')||
       text.includes('crime')||
       text.includes('emergency'))
   
   {
      session.topic = 'Emergency';

      return "For police help in Deggendorf, you can contact Polizeiinspektion Deggendorf.\n\n" +
             "Address: Hans-Krämer-Straße 65, 94469 Deggendorf.\n" +
             "Phone: +49 991 3896-0\n\n" +
             "In an emergency, call 110 for police.\n" + 
             "For medical or fire emergency, call 112.\n\n" +
             "You can ask me about emergency, lost items, theft or police station location.";
   }

   if (session.topic == 'Emergency' &&
       (text.includes('police')||
        text.includes('urgent')||
        text.includes('danger')))
   {
      return "If you are in immediate danger, call 110 for police emergency in Germany.\n\n" +
             "For ambulance or fire brigade, call 112.";
   }

   if (session.topic == 'Emergency' &&
       (text.includes('location')||
        text.includes('where')||
        text.includes('address')))
   
   {
      return "The police station in Deggendorf is:\n\n" + 
             "Polizeiinspektion Deggendrof\n" +
              "Hans-Krämer-Straße 65\n" +
              "94469 Deggendorf\n\n" +
              "Phone: +49 991 3896-0";
   }

   if (session.topic == 'Emergency' &&
       (text.includes('lost')||
        text.includes('stolen')||
        text.includes('theft')))
   
   {
      return "If something is stolen, you should connect with the police\n\n" +
             "For lost items, you can also ask the city lost and found office, called Fundbüro\n\n" + 
             "If it is urgent, call 110";
   }
}

/*Nearby Cities*/
function NearbyCities(text,session){
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
                "• Activities";
        }

        return "I am sorry, I'm not sure if I understand what you're looking for.Could you please try it again with a few words? \n\n"+
                "Or you can find us by phone: +49 991 2960 5055 or send us a email: tourismus@deggendorf.de. We will be very happy to help you! :-)"
}

module.exports = { replyTopic };

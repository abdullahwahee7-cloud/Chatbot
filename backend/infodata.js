/*We are using the keywords strategy to make the bot understand and reply the message*/

/*The topics*/
function replyTopic (message,session) {
   const text = message.toLowerCase();

   return (
      Greeting(text) ||
      Basicinfo(text, session) ||
      Weather(text,session) ||
      Historyinfo (text) ||
      Transportation (text,session) ||
      Shopping (text) ||
      Healthcare (text) ||
      Accomdation (text) ||
      Restaurant (text) ||
      Activity (text) ||
      School (text) ||
      THD (text) ||
      Sightseeing (text) ||
      "I am sorry, I'm not sure if I understand what you're looking for. Could you please try it again with a few words? "+
      "Or you can find us by phone: +49 991 2960 5055 or send us a email: tourismus@deggendorf.de. We will be very happy to help you! :-)"
   )
}

/*Greeting*/
function Greeting (text) {

    if (text.includes('hello') ||
       text.includes('hallo') ||
       text.includes('hi')
       )
       {
        return "Hello! Welcome to Deggendorf. What do you want to know about our beautiful city?"+
               "If you are tourist, you can ask me about basic infomation of Deggendorf, the history, weather, transportation, shopping, tourism, accomdations, restaurants, local events, education insitituation and healthcare";
       }
}

/*Basic information */
function Basicinfo(text,session){

    if (text.includes('introduce') ||
       text.includes('basic information') ||
       text.includes('name') ||
       text.includes('country') ||
       text.includes('where is deggendorf')
       )

       { session.topic = 'basicinfo';

         return {text: "Deggendorf(Degndorf, Deggndorf) is a town in Bavaria, Germany, capital of the Deggendorf district",
               //image: "/image/DEG.jpd"       
               }
       }

    if (session.topic == 'basicinfo' &&
       (text.includes('location') ||
       text.includes('located'))
       )
       {return {text: "Deggendorf is in the center of Lower Bavaria. It is located on the left bank approximately in the middle between the Danube cities of Regensburg and Passau. "+
                      "The Danube forms the town's natural border towards the south. Towards the west, north and east the town is surrounded by the foothills of the central Bavarian Forest.",
                //image: "/image/map.jpd"
               }
       }   
    
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

    if (text.includes('climat')||
        text.includes('weather'))
       { session.topic = 'weather';

         return "In Deggendorf, the summers are comfortable, the winters are freezing and snowy, and it is partly cloudy year round."+
               "Over the course of the year, the temperature typically varies from -4°C to 24°C and is rarely below -12°C or above 31°C."+
               "Based on the tourism score, the best time of year to visit Deggendorf for warm-weather activities is from late June to early September."
       }
 
    /*if we have time we can update this by using API*/
    if (session.topic == 'weather' &&
        (text.includes("today")||
        text.includes("temperature")||
        text.includes("current"))
       )
       {return "For today's weather, you can check from here: https://openweathermap.org/city/2938540"
       }
}

/*History*/
function Historyinfo(text){   
    if (text.includes('history')||
        text.includes('historic')||
        text.includes('founded'))

       {return "The oldest settlements in today's Deggendorf city area are located south of the Danube. "+
               "In 1002, Deggendorf was first mentioned in a document. King Heinrich II confirms his possession in Deggendorf to the Niedermünster canoness monastery in Regensburg."+
               "In the 12th century, a first settlement was established in the north-eastern area of today's old town, which was proven by the excavations of the city archaeology."+
               "In 1316, the widow of Duke Otto III, Agnes, granted Deggendorf town rights. "+
               "In the 19th century, the construction of Ruselstraße (1815 to 1817) and an iron bridge over the Danube (1859 to 1863) significantly improved Deggendorf's infrastructure. "+
               "In 1866, Deggendorf joined the railway network to Plattling at the instigation of an interest group of Deggendorf citizens."+
               "The station was still in Fischerdorf at that time and only after the construction of a railway bridge over the Danube in 1877) could it be abandoned."
       }
}

/*Transportation*/
function Transportation(text, session) {
   if (
      text.includes("how to get to deggendorf?") ||
      text.includes("travel") ||
      text.includes("transportation")
   ) {
      session.topic = "transportation";
      return "You can reach Deggendorf by train, bus, or car.";
   }
}
 


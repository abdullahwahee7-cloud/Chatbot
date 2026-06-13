/*We are using the keywords strategy to insure the bot understand and reply the message*/

/*The topics*/
function replyTopic (message, session){
   const text = message.toLowerCase();

   return (
      Greeting(text) ||
      Basicinfo(text, session) ||
      Weather(text,session) ||
      Historyinfo (text) ||
      Transportation (text,session) ||
      Shopping (text,session) ||
      Healthcare (text,session) ||
      Accomdation (text,session) ||
      Restaurant (text,session) ||
      Activity (text,session) ||
      School (text,session) ||
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
               "You can ask me about basic infomation of Deggendorf, the history, weather, transportation, shopping, tourism, accomdations, restaurants, local events, education insitituation and healthcare";
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

         return "Deggendorf(Degndorf, Deggndorf) is a town in Bavaria, Germany, capital of the Deggendorf district"
               //image: "/image/DEG.jpd"       
               
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
        (text.includes('today')||
        text.includes('temperature')||
        text.includes('current'))
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
function Transportation (text,session) {
   if (text.includes('how to get to deggendorf?')||
       text.includes('travel')||
       text.includes('transportation')||
       text.includes('how to arrive to deggendorf')
      )
      {session.topic = 'transportation';
       return "You can reach Deggendorf by train, bus, plane or car."+
              "Which option would you like to know more about?"+
              "If you need find a parking place, please reply with 'parking'"+
              "If you need information about public transportation in Deggendorf, please reply with 'citybus'"            
      }

      if (session.topic == 'transportation' &&
          (text.includes('car') ||
           text.includes('auto'))
          )
         {return "A3: Cologne - Frankfurt - Nuremberg - Regensburg - Deggendorf"+
                 "A92: Munich - Deggendorf"
         }

      if (session.topic == 'transportation' &&
          (text.includes('train')||
           text.includes('db'))
          )
         {return "The nearst ICE-Station is Bahnhof Plattling, you can reach Plattling from many cities in Germany."+
                 "From Plattling, take RB35 to Deggendorf Hauptbahnhof (main station). The journey takes about 10 minutes." +
                 "Ticket booking: https://www.bahn.de/service/fahrplaene/reiseauskunft"
         }

      if (session.topic == 'transportation' &&
         (text.includes ('bus') && !text.includes ('citybus'))
         )
         {return "You can reach Deggendorf by FlixBus from many cities, "+
                "for ticket booking please check: https://www.flixbus.com/bus/deggendorf"
         }
        
      if (session.topic == 'transportation' &&
         (text.includes ('plane'))
         )
         {return "Deggendorf is located about 100km (about 1 hour's drive) from the Franz-Josef-Strauss airport in Munich."
         }
      
      if (text.includes ('transportation'))
         {return "With over 1500 parking spaces, shopping and strolling without parking stress,"+
                 "inexpensive and protected from the weather, central and no time limit." +
                 "Simply follow our parking guidance system: https://stadtparken-deggendorf.de/?article_id=4"
         }

      if (session.topic == 'transportation' &&
          (text.includes ('citybus'))
         )
         {return "With four lines in the city bus service, we can transport you across the city area!"+
                 "Timetables and network map can be find : https://www.deggendorf.de/leben/mobilitaet-verkehr/stadtbusverkehr" 
         }
}

 
/*Shopping*/
function Shopping (text,session) {
   if ((text.includes('shop')||
       text.includes('mall')||
       text.includes('market') ||
       text.includes('buy') ||
       text.includes('store'))
       && !text.includes('local market'))
      {session.topic = 'shop';
       return "There are many shopping opportunities in Deggendorf, including supermarkets, fashion stores or local market."+
              "Which one would you like to know more?"
      }

      if (session.topic == 'shop' &&
          (text.includes('supermarket'))
          )
         {return "We have Lidl, Aldi, Rewe and Edeka."
         }
      
      if (session.topic == 'shop' &&
          (text.includes('fashion') ||
           text.includes('cloth') ||
           text.includes('beauty')||
           text.includes('make-up')||
           text.includes('store'))
          )
         {return "The city center around Luitpoldplatz offers a variety of shops." +
                 "For example: Tk Maxx, Tedi, Muller, H&M, New Yorker, etc."
         }

           
      if (session.topic == 'shop' &&
          (text.includes('local market') ||
           text.includes('farm')||
           text.includes('local')) 
          )
         {return "We also have the Deggendorf farmers' market. You can buy not only vegetables, fruit, juices,"+
                 "but also meant, sausage specialties, flowers. Herbs and baked goods are also offered."+
                 "The vegetables usually come from organic farming."+
                 "Time: Saturday 08:00- 13:00"+
                 "Location: Stadtplatz Deggendorf, Oberer Stadtplatz"
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
       text.includes('medic')||
       text.includes('ill'))
      {session.topic = 'health';
       return  "There are varieties healthcare insitituation in Deggendorf."+
               "For general medical care, you can visit DONAU ISAR Klinikum Deggendorf, the largest general hospital in Deggendorf"+
               "Please call 112 if any emergency medical needs"
      }

      if (session.topic == 'health' &&
          text.includes('donau'))
         {return "Donau Isar Kinikum is located at Perlasberger Str. 41, 94469, Deggendorf" +
              "Phone: 0991/ 380-0"+
              "E-mail: info@donau-isar-klinikum.de" } 
}

/*Accomdation*/
function Accomdation(text, session){
   
   if (text.includes('hotel')||
       text.includes('touris')||
       text.includes('accommoda')|| 
       text.includes('stay')||
       text.includes('hostel')||
       text.includes('apartment')
       )
      {session.topic = 'hotel'
       
       return "Welcome to Deggendorf! Most accommodations in Deggendorf can be found in our booking portal:"+
              "https://tportal.tomas.travel/StadtDeggendorf/ukv?globalreset=1"+
              "If you are a student and looking for a place to stay during your study, please reply 'student' "
      }

    
      if (text.includes('student'))
         {session.topic = 'studdor'}

         if (session.topic == 'studdor' &&
             (text.includes('student') && !text.includes('student dorm')))
            {return "Finding a place to stay in Deggendorf is very important for student."+
                 "You can apply for dormitories or private offers."+
                 "Which would you like to know more?"}
      
         if (session.topic == 'studdor' &&
             (text.includes('student dormitor') ||
              text.includes('dorm'))
             )
            {return "All apartments are located within easy walking distance of Deggendorf town and the campus of DIT."+
                    "View your options here: https://www.th-deg.de/accommodation#deggendorf"}

         if (session.topic == 'studdor' &&
             (text.includes('private') ||
             text.includes('share'))
            )
            {return "DIT has its own flat exchange platform where student or landlords offer apartements for sublease or permanent rent."+
                    "click here: https://pmit-ext.th-deg.de/wb/search?lang=en"+
                    "Or you can find offers on public websites."
            }
         
         if (session.topic == 'studdor' &&
             (text.includes('public')||
             text.includes('wg'))
            )
            {return "Here are some public websites you can find several offers:"+
                    "WG- Gesucht.de: WG-Gesucht.de: https://www.wg-gesucht.de/en/"+
                    "Ebay Kleinanzeigen: https://www.ebay-kleinanzeigen.de/simmobilien/94469/c195l16909"+
                    "Immobilienscout24: https://www.immobilienscout24.de/wohnen/bayern,deggendorfkreis/wohnungen.html"
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
         {session.topic = 'food'}

      if(session.topic == 'restaurant'&&
             (text.includes('indian')||text.includes('curry'))
            )
             {return "For indian food in Deggendorf,you can try Taj Mahal or Shiva" +
                      "Taj Mahal:  https://tajmahaldeggendorf.de/de "+
                      "Shiva: https://www.indisches-restaurant-deggendorf.de/" 
             }
         
      if(session.topic == 'restaurant'&&
        (text.includes('mensa')||text.includes('student')||text.includes('campus'))
        )
        {return "For students, the Mensa at THD is a goood option. You can check THD information here"+
                "THD: https://www.th-deg.de/"
        }
 
        if(session.topic == 'restaurant'&&
          (text.includes('syrian')||text.includes('arabic')||text.includes('shawarma'))
          )
          {return "For Syrian Food or Arabic Food in Deggendorf, it is best to search current options here"+
                  "Google Maps: https://www.google.com/maps/search/syrian+restaurant+Deggendorf"
          }

        if(session.topic == 'restaurant'&&
           (text.includes('turkish')||text.includes('kebab')||text.includes('doner')||text.includes('döner'))
          )
          {return "For Turkish Food or döner in Deggendorf, you can check Ankara Grill or search here"+
                  "Ankara Grill: https://www.tripadvisor.com/Restaurant_Review-g811095-d23507287-Reviews-Ankara_Grill-Deggendorf_Lower_Bavaria_Bavaria.html"+
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
         {return "There are some Asian food restaurant worth to try:"+
                 "Hai Pai Cuisine: https://haipaicuisine.de/"+
                 "Sen Resraurant: https://www.sen-deggendorf.de/"+
                 "SAIKYO Restaurant - Asian Fusion & Sushi: https://www.saikyo.de/ "
         }

      if (session.topic == 'restaurant' &&
          (text.includes ('italia')||
           text.includes('pasta')||
           text.includes('pizza')
          ))
          {return "There are some Italy restaurant worth to try:"+
                  "Laurin - Pasta & Pizza: https://www.laurin-deggendorf.de/"+
                  "Mama Mia Da Max : https://mamamia-max.de/" 
          }
      
      if (session.topic == 'restaurant' &&
          (text.includes ('local')||
           text.includes ('germany')||
           text.includes ('traditional')||
           text.includes ('bavarian')||
           text.includes ('european'))
         )
         {return "Here are top 3 restaurants of german style in Deggendorf (according to Tripadvisor):"+
                 "Gasthaus Zur Knodelwerferin: https://www.knoedelwerferin-deggendorf.de/"+
                 "Hotel Gasthof Hottl: https://www.hoettl.de/" +
                 "Schober Otto Gaststaette: https://www.schober-otto.de/"
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
         {return "There are many cafés and coffee shops in Deggendorf where you can enjoy coffee, tea, and snacks." +
                 "Most cafés are located in the city center and shopping areas."
         }

      if (session.topic == 'restaurant' &&
          (text.includes ('fast')||
           text.includes ('burger')||
           text.includes ('fried')||
           text.includes ('sandwich'))
         )
         {return "We have MacDonald's, Subway, Kochloffel and Burger King in Deggendorf."
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
         {return "Deggendorf has many food options. You can ask about indian, italian, mensa, german, syrian or turkish food. Which one would you like?"}
 }


 /*School & THD*/
function School (text,session){
        if (text.includes('school')||
            text.includes('education')||
            text.includes('college')||
            text.includes('universit')||
            text.includes('study')||
            text.includes('thd')||
            text.includes('dit')||
            text.includes('technology')||
            text.includes('applied sciences'))

           {session.topic = 'school'}
           
          /*THD*/ 
          if (session.topic == 'school' &&
             (text.includes('universit')||
              text.includes('thd')||
              text.includes('dit')||
              text.includes('applied sciences')||
              text.includes('technology'))
           )
           {session.topic = 'thd'}

             if (session.topic == 'thd' &&
                ( text.includes('introduc')||
                text.includes('thd')||
                text.includes('dit')||
                text.includes('where')||
                text.includes('loca')))
           
                {return "The Deggendorf Institute of Technology (THD) offers Bachelor's and Master's degree programmes in the fields of civil and environmental engineering, natural sciences, electrical engineering and computer science, mechanical engineering, media as well as health and economics"+
                   "The THD has 45% international students. 3 study locations. The main campus of THD is located in the center of Deggendorf. "+
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

                {return "To begin your studies at the Deggendorf Institute of Technology, you need applying to study."+
                     "Step by step to a successful application from here: https://th-deg.de/en/apply"
                }


             if (session.topic == 'thd' &&
                (text.includes('event') ||
                 text.includes('activity') ||
                 text.includes('party')||
                 text.includes('club')))

                {return "THD is holding a variety of activities, including diversity week, international week, online consultation, career development, sports, party, cinema night, etc. "+
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
  
            {return "In the district of Deggendorf, probably one of the most school-friendly in Bavaria, there are almost 80 state, municipal and private institutions for the training, further education and further education of the population in school and work"+
               "There are schools of general education, Vocation schools, adult education, technical colleges, primary and secondary schools, university, continuing education and special schools" +
               "For more information, please click: https://www.landkreis-deggendorf.de/leben-arbeiten/bildung/schulen-weiterbildung/"}

}

 
 /*Activity & sightseeing*/
function Activity (text, session) {
   if (text.includes('activit') ||
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
       text.includes('thins to do')||
       text.includes('do in deggendorf'))

       {session.topic = 'activity'}

       if (session.topic == 'activity' &&
           text.includes('fish'))
           {return "Fishing enthusiasts will find optimal conditions in lakes and revier of deggendorf"+
                   "Further information and booking options can be found on here:https://angeln-in-deggendorf.de/"
           }

           
       if (session.topic == 'activity' &&
           (text.includes('camp')||
           text.includes('motorhome')))
           {return "We have four campsite for you:"+
                   "Campsite Donaustrandhaus, located Eginger Str. 42, 94469 Deggendorf. Tel: 0991 4324"+
                   "Camping on the farm: Tel: 0991 22027"+
                   "Motorhome pitches, located Sandnerhofweg 4-6, 94469 Deggendorf. Tel: 0991 28960"+
                   "Motorhome pitches in the Danube Park, located Neusiedler Str. conner of Ackerloh. 5 free parking space without equipment and can be used all year around."
           }

        if (session.topic =='activity' &&
            (text.includes('walk')||
             text.includes('hike')||
             text.includes('trail')||
             text.includes('route'))
           )
           {return "Deggendorf is located at the foot of the Bavarian Forest. With this ideal location, the Danube town of Deggendorf is considered the 'gateway of Bavarian Forest'."+
                   "Here are top 9 hiking routes in Deggendorf, click the link to know more:"+
                   "1. Danube Panorama Trail: https://deggendorf.travel/freizeit/wandern/donaupanoramaweg"+
                   "2. Circular hiking trail Greising: https://deggendorf.travel/freizeit/wandern/rundwanderweg-greising"+
                   "3. Destination hiking trail Landshuter Haus: https://deggendorf.travel/freizeit/wandern/zielwanderweg-muehlbogen"+
                   "4. Muhlbogen circular hiking trail: https://deggendorf.travel/freizeit/wandern/rundwanderweg-muehlbogen"+
                   "5. Circular hiking trail Deggendorf- Kulturviertel: https://deggendorf.travel/freizeit/wandern/rundwanderweg-deggendorf-kulturviertel"+
                   "6. Ruselabsatz Hiking Trail: https://deggendorf.travel/freizeit/wandern/zielwanderweg-ruselabsatz"+
                   "7. Circular hiking trail Leoprechtstein: https://deggendorf.travel/freizeit/wandern/rundwanderweg-leoprechtstein"+
                   "8. Seebach circular hiking trail: https://deggendorf.travel/freizeit/wandern/rundwanderweg-seebach"+
                   "9. Destination hiking trail Franzosenweg: https://deggendorf.travel/freizeit/wandern/zielwanderweg-franzosenweg" +
                   "You can find more here: https://deggendorf.travel/freizeit/wandern"
            }

 
        if (session.topic == 'activity' &&
            (text.includes('park') ||
             text.includes('picnic'))
        )
        {return "These two parks are highly recommended:"+
                "Stadtpark:https://www.deggendorf.de/veranstaltungen/ort/stadtpark" +
                "Donaupark Deggendorf: https://www.bayerischer-wald.de/attraktion/donaupark-deggendorf-d85ad3641c"
        }

        if (session.topic == 'activity' &&
            text.includes('golf'))
            {return "In Deggendorf you can improve your handicap on one of the highest golf courses in southern Bavaria."+
                    "Golf Courses in Deggendorf: Miniature golf course, Am Stadtpark 42. Tel: 0991 29793934"+
                    "For more detail: https://www.deggendorfer-golfclub.de/"
            }

        if (session.topic == 'activity' &&
            (text.includes('bike')||
             text.includes('cycl')||
             text.includes('bicycle'))
           )
           {return "Whether leisurely family bike tours, sport bike tours or challenging two-wheeler tours and fitness pedal knights"+
                   "the many cycle path in and around Deggendorf will make every 'cyclist's heart' beat faster."+
                   "Here are most popular cycling routes, click the link to know more:"+
                   "Danube Cycle Path: https://deggendorf.travel/freizeit/radfahren/donauradweg"+
                   "Isar Cycle Path: https://deggendorf.travel/freizeit/radfahren/isarradweg"+
                   "Cycling in and around Deggendorf: https://deggendorf.travel/freizeit/radfahren/stadtradeln"+
                   "Danube IIz Cycle Path: https://deggendorf.travel/freizeit/radfahren/donau-ilz-radweg"+
                   "For more information, please check from here: https://deggendorf.travel/freizeit/radfahren"
           }  
           
        if (session.topic == 'activity' &&
            (text.includes('ice')||
             text.includes('skat')||
             text.includes('hockey')||
             text.includes('dsc')||
             text.includes('winter'))
           )
           {return "There are plenty of fun for cold and winter at Deggendorf ice stadium. For example: classic ice skating, disco or themed ice skating" +
                   "And Our Deggendorf ice hockey games are always worth a visit. Come and support our Deggendorfer SC"+
                   "Click here to know more: https://eisstadion.deggendorf.de/"
           }  

    if (text.includes('activit') ||
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
       text.includes('what can I do')||
       text.includes('thins to do')||
       text.includes('do in deggendorf'))

       {return "There are a variety of activities in Deggendorf, including family activities, concerts, culture events,hiking, cycling, ski, golf and picnic. "+
               "What would you like to know more?"+
               "You can find more details through our website: https://www.deggendorf.de/veranstaltungen "
           }
 }    


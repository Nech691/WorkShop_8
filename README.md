# WorkShop_8
WS8 Project - Colombo Weather

*** 

**link = https://nech691.github.io/WorkShop_8/**

***

# Tasks 
- Create a sketch that makes an API call to gather data from an external source. Here is a list of [free and open APIs](Links to an external site) which do not require authentication.
- Visual elements of the sketch should be determined by data retrieved from the external source.

---

# Project 
- **Goal 1**
  - Create a code that:
    - Gathers data from WorldTimeAPI from Colombo, Brazil 
      - About date and time 
    - Gathers data from the Open-Meteo API 
      - From Colombo, Brazil 
      - About the current time 
      - About the current temperature
      - About if it's night or day 
      - About if it's raining 
      - About tomorrow's min and max temps
    - Uses that data to generate a sketch on the screen that changes with the updating data
      - The current date and time will be displayed
      - The current temperature will determine the color of a thermometer (rect) 
      - Tomorrow's min and max temperatures will also be displayed
      - If it's night, the sketch will be dark, if its day, the sketch will be light (filter)
      - If it's raining, lines moving down will be added to represent it 
- **Issue with goal 1**
  - Time from WorldTime API was inaccurate. Then I realised Open-Meteo API has that data (date and time), and I decided to remove the first API, and focus on only one.  
  - I also couldn't find out how to use the Open-Meteo API to figure out if it was raining in Colombo at the time we run the code, so I dropped that idea 

- **Goal 2**
  - Create a code that:
    - Gathers data from the Open-Meteo API from Colombo, Brazil 
      - Current data
        - About date and time 
        - About if it's night or day 
        - About the current temperature
      - Daily data 
        - About tomorrow's min and max temps
    - Uses that data to generate a sketch on the screen that changes with the updating data
      - Displays on the right side 
        - The current date and time 
        - If it's night or day 
        - The current temperature
        - Today's range of temperatures (min - max)
        - Tomorrow's range (min and max temperatures) 
      - The current temperature will determine the color of a thermometer (rect) on the right side of the canvas 
      - Add a picture of Colombo to the background
      - If it's night, the picture will be dark, if its day, the sketch will be light (filter)
  
- **Steps**
  - **Skateboard method**
    - [x] Gather data from the Open-Meteo API from Colombo, Brazil 
      - [x] Current data
        - [x] About date and time 
        - [x] About if it's night or day 
        - [x] About the current temperature
      - [x] Daily data 
        - [x] About today's and tomorrow's min and max temps
        - Link = [https://api.open-meteo.com/v1/forecast?latitude=-25.2917&longitude=-49.2242&current=temperature_2m,is_day&daily=temperature_2m_max,temperature_2m_min&timezone=America%2FSao_Paulo&forecast_days=3](https://api.open-meteo.com/v1/forecast?latitude=-25.2917&longitude=-49.2242&current=temperature_2m,is_day&daily=temperature_2m_max,temperature_2m_min&timezone=America%2FSao_Paulo&forecast_days=3)
    - **Display**
      - [x] The current date and time 
      - [x] If it's night or day 
      - [x] The current temperature
      - [x] Today's range of temperatures (min - max)
      - [x] Tomorrow's range (min and max temperatures) 
    - [x] Uses that data to generate a sketch on the screen that changes with the updating data
      - [x] Canvas to users window settings
      - [x] Resizable canvas
      - [x] Displays on the top  
        - [x] The current date and time 
        - [x] If it's night or day 
        - [x] The current temperature
        - [x] Today's range of temperatures (min - max)
        - [x] Tomorrow's range (min and max temperatures) 
      - [x] The current temperature will determine the color of a thermometer (rect) on the top of the canvas
      - [x] Add a picture of Colombo to the background on the bottom of the canvas
      - [x] If it's night, the picture will be dark, if its day, the sketch will be light (tint)
      - [x] Add borders 

---

# Workshop Notes 
Application Programming Interfaces (APIs)

- APIs are extremely useful, and present a whole new range of possibilities to our codes
- APIs allow us to gather data from websites to use within our code
-  in this workshop we'll look at requesting data [do keep in mind that you can also send data via APIs]
  - E.g., Chat GPT, and AI image generators 
- APIs often require authentication  -> API keys 
- We will work with free, open source APIs (that don't require authentication)
  - If you do use APIs that require an authentication key, do not include it in your public repositories, or anywhere that will be publicly accessible. You can hide API keys in your code, but don't worry about that for now. 
  
- **Working with ipify API**
  - [https://www.ipify.org/](https://www.ipify.org/)
  - API to retrieve your IP address 
  - We'll use the json (Java Script Object Notation) response format [https://api.ipify.org?format=json  - modifying the URL portion]
  
- **To work with ipify API in our code:**
  1. Set two variables 
    - For the IP  
    - For the URL
  2. Create a asynchronous function to use the API
    - This is a type of function that executes asynchronously (thus, not holding the rest of the code while it runs)
    - This is done because we will execute an http request (requesting a website for data), which may take an indefinite amount of time
      - i.e., "async function getIP"
  3. Then, set up a local variable for the API originated data using the "await fetch()" function 
    - The syntax of this function is:
      - await fetch('URL') 
      - In this case the URL was stored under "ip_api" and the data was stored under "data"
  4. Inside the asynchronous function, also add another local variable to convert the data to a json format using the "await data.json()"
      - i.e., "let j_data = await data.jason()"
  5. Then, we will access part of the json data using the local variable we used for the json data 
      - i.e., "ip = j_data.ip"
    - The ".ip" part is to match the json format to call the IP, as it is one object with an attached variable  
  6. Then, we will implement this in our set up function (to only happen once at the beginning of the code)
      - i.e. "getIP();"
  7. Finally, add this to your draw function using text 
      - i.e., "text(ip, 20, 100)"
  
- **Working with JokeAPI**
  - [https://v2.jokeapi.dev/](https://v2.jokeapi.dev/)
  - API to generate jokes 
  - Change the type of jokes you want and get the URL [https://v2.jokeapi.dev/joke/Dark?type=twopart]
  - If you copy that into the browser, you will find the formats for the json data we will receive
    - This is important to see the different things contained in our data 
    
- **To work with JokeAPI:**
  1. Set three variables 
    - Two for the joke set up and punchline
    - One for the URL
  2. Create a asynchronous function to use the API
    - Set up a local variable for the API originated data using the "await fetch()" function 
      - i.e., "data = await fetch(joke_api)"
    - Add another local variable to convert the data to a json format using the "await data.json()"
      - i.e., "let j_data = await data.jason()"
    - Access part of the json data using the local variable we used for the json data 
      - i.e., "intro = j_data.setup;
        - Punchline = j_data.delivery"
  3. Then, we will implement this in our set up function (to only happen once at the beginning of the code)
      - i.e. "getJoke();"
  4. Finally, add this to your draw function using text 
      - i.e., "text(intro, 20, 200);
        - text(punchline, 20, 220);"
- **With this set up, since , the data is only retrieved once**
  5. To continuously retrieve the data, and thus update our sketch with the new information, we must use setInterval (instead of getJoke) in the set up function
  
- **! IMPORTANT !**
  - Note that APIs often have a limit of how many calls you can make (per given amount of time), and it's good practice to not overload your original API
  
- **Using OpenMeteo API**
  - [https://open-meteo.com/en/docs](https://open-meteo.com/en/docs)
  - Weather API  
  - Modify the URL to contain:
    - Auckland's weather 
    - 1 day forecast
    - Hourly temperature values 
    - Current temperature 
    - Current is day or night 
  - [https://api.open-meteo.com/v1/forecast?latitude=-36.8485&longitude=174.7635&current=temperature_2m,is_day&hourly=temperature_2m&forecast_days=1](https://api.open-meteo.com/v1/forecast?latitude=-36.8485&longitude=174.7635&current=temperature_2m,is_day&hourly=temperature_2m&forecast_days=1)
  - If you copy that into the browser, you will find the formats for the json data we will receive
    - This is important to see the different things contained in our data 
      - In this case, the parts we'll need to call are nested within other parts 
      
- **To work with OpenMeteoAPI:**
  1. Set three variables 
    - Two for the current temperature and day night features
    - One for the URL
  2. Create an asynchronous function to use the API (as we need to finish loading the code before moving with our sketch)
    - Set up a local variable for the API originated data using the "await fetch()" function 
      - i.e., "data = await fetch(weather_api)"
    - Add another local variable to convert the data to a json format using the "await data.json()"
      - i.e., "let j_data = await data.jason()"
    - Access part of the json data using the local variable we used for the json data (adding another . to access nested folders)
      - i.e., "currentTemp = j_data.current.temperature_2m;
        - dayNight = j_data.current.is_day"
  3. Then, we will implement this in our set up function (to only happen once at the beginning of the code)
      - i.e. "getWeather();"
  4. Finally, add this to your draw function using text 
      - i.e., "text("Temperature now is: "+ currentTemp, 20, 200);
        - text("" + dayNight, 20, 220);"
  5. As an extra step we can use the information gattered the dateNight command to create a circle that gets filled with different colours depending on if it's night or day 
  6. As another extra step, we could use another variable and a nested index to get the hourly temperature
    - New variable = tempInTwoHours
    - Initialise it inside getWeather function 
      - i.e., "j_data.temperature_2m[2]"
    - Add it to the draw function 
      - i.e., "text('Temperature in 2 hours will be: ' + tempInTwoHours, 20, 300)"


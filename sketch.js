// -> Variables & Links
// - API => Current temperature, temp min max (for tomorrow), and day or night
let currentDateTime, currentTemp, maxTod, maxTom, minTod, minTom, dayNight;
let wtr_api = "https://api.open-meteo.com/v1/forecast?latitude=-25.2917&longitude=-49.2242&current=temperature_2m,is_day&daily=temperature_2m_max,temperature_2m_min&timezone=America%2FSao_Paulo&forecast_days=3";

async function getDT(){ // -> Function to get date and time data
  let data = await fetch(wtr_api); // - Get and store data from API
  let j_data = await data.json(); // - Data into json format

  let dateTimeString = j_data.current.time // - Data as string
  currentDateTime = format(dateTimeString); // - Format object (text)

  currentTemp = j_data.current.temperature_2m; // - Access nested "temperature_2m" part of that opject 
  dayNight = j_data.current.is_day; // - Access nested "is_day" part of that opject 
  maxTod = j_data.daily.temperature_2m_max[0]; // - Access nested "temperature_2m_max" for today 
  minTod = j_data.daily.temperature_2m_min[0]; // - Access nested "temperature_2m_min" for today
  // console.log("Min temperature for today:", minTod);
  maxTom = j_data.daily.temperature_2m_max[1]; // - Access nested "temperature_2m_max" for tomorrow
  minTom = j_data.daily.temperature_2m_min[1]; // - Access nested "temperature_2m_min" for tomorrow
}

function format(dateTimeString){ // -> Formatting function
  let dateTime = new Date(dateTimeString) // - Create new object to store data and time as string
  console.log("Date object:", dateTime);
  let day = dateTime.getDate(); // - Get date from string 
  let month = dateTime.getMonth() + 1; // - Get month from string add one to compensate for index 0
  let year = dateTime.getFullYear(); // - Get 4 year digits from string 
  let hours = dateTime.getHours(); // - Get hours from string 
  let minutes = dateTime.getMinutes(); // - Get minutes from string 

  minutes = minutes < 10 ? '0' + minutes : minutes; // Add leading zeros to minutes if necessary

  return day + "/" + month + "/" + year + " - " + hours + "h" + minutes + " (24h)"; // - Return format DD/MM/YYYY - HHhMM
}

function setup(){
  createCanvas(400, 400);
  getDT(); // - Set up get whether data function 
}

function draw(){
  background(220);
  // -> Date and Time
  if(currentDateTime){ // - If date time data has loaded
    text("The current Date and Time is: " + currentDateTime, 40, 20, 90); // - Date and time text 
  }

  // -> Weather 
  text("Today's range is: " + minTod + " - " + maxTod, 20, 240); // - Current Temp. text 
  text("Current temperature is: " + currentTemp, 20, 260); // currentTep text 
  text("Day or Night? " + (dayNight ? "Day" : "Night"), 20, 280); // - Day/Night text 
  text("Tomorrow's range: " + minTom + " - " + maxTom, 20, 300);
}
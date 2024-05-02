// -> Variables & Links
// - API => Current temperature, temp min max (for tomorrow), and day or night
let currentDateTime, currentTemp, maxTod, maxTom, minTod, minTom, dayNight;
let wtr_api = "https://api.open-meteo.com/v1/forecast?latitude=-25.2917&longitude=-49.2242&current=temperature_2m,is_day&daily=temperature_2m_max,temperature_2m_min&timezone=America%2FSao_Paulo&forecast_days=3";
let Colombo; // - Image variable

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
  createCanvas(windowWidth, windowHeight); // - Canvas to users settings 
  getDT(); // - Set up get whether data function 
  Colombo = loadImage('Colombo.jpg')
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight); //- Resisable window
}

function sqLine(){
  // rectangles 
  fill("#290C44"); // - Set "line" color
  rect(355, 80, 3, 70, 10); // - Create "line"
}

function extraSqs(){ // Temperature colour chart 
  textSize(15)
  fill("#290C44")
  text("Temperature color scale", 770, 170, 60)
  fill("#110BC6"); // - Fill with blue
  text(" 0 °C >", 780, 230);
  rect(795, 240, 15, 10, 20);
  fill("#450A97"); // - Fill with purple
  text(" 0 °C - 5 °C", 770, 270);
  rect(795, 280, 15, 10, 20);
  fill("#790A67"); // - Fill with pinkish purple
  text(" 5 °C - 16 °C", 770, 310);
  rect(795, 320, 15, 10, 20);
  fill("#AD0938"); // - Fill with orangeish red
  text(" 16 °C - 25 °C", 770, 350);
  rect(795, 360, 15, 10, 20);
  fill("#E10808"); // - Fill with red
  text(" > 25 °C", 775, 390);
  rect(795, 400, 15, 10, 20);
}

function draw(){
  background(220);
  image(Colombo, 40, 180, Colombo.width, Colombo.height)
  // -> Date and Time
  if(currentDateTime){ // - If date time data has loaded
    textSize(24); 
    fill("#290C44"); // - Set text color
    textStyle(BOLDITALIC) // - Bold text
    textFont('Bell MT'); // Set font family
    text("The current date and time in Colombo, Brazil is: " + currentDateTime, 40, 20, 450); // - Date and time text 
  }
  // -> Weather 
  textSize(18); 
  fill("#290C44"); // - Set text color
  textStyle(BOLDITALIC) // - Bold text 
  textFont('Bell MT'); // Set font family  
  text("Current temperature is: " + currentTemp + " °C", 60, 110); // currentTep text 
  text("Today's min and max are: " + minTod + " - " + maxTod + " °C", 60, 140); // - Current Temp. text 
  text("Tomorrow's mins and max are: " + minTom + " - " + maxTom + " °C", 380, 140);

    // Apply tint over the image based on dayNight
    if (dayNight === 0) { // - If returns o [night]
      tint(0, 220); // Apply black tint with low alpha
    } else { // - If returns 1 [day]
      tint(255, 170); // Apply white tint with low alpha 
    }
    image(Colombo, 40, 180, Colombo.width, Colombo.height); // Draw the image
    
    // Reset tint to default (no tint)
    tint(255);
  
  if(dayNight === 0){ // -> If dayNight returns 0 [night]
    textSize(18); 
    fill("#290C44"); // - Set text color
    textStyle(BOLDITALIC) // - Bold text
    textFont('Bell MT'); // Set font family 
    text("Day or Night?  Night", 380, 110) // - Night text 
    } else { // if not (it returns 1 [day]) 
    textSize(18); 
    fill("#290C44"); // - Set text color
    textStyle(BOLDITALIC) // - Bold text
    textFont('Bell MT'); // Set font family
    text("Day or Night?  Day", 380, 110) // - Day text 
  }

  if(currentTemp < 0){ // - If temp below 0
    fill("#110BC6"); // - Fill with blue
  } else if (currentTemp >= 0 && currentTemp < 5){ // - Between 0 and 5
    fill("#450A97"); // - Fill with purple
  } else if (currentTemp >= 5 && currentTemp < 16){ // - Between 5 and 16
    fill("#790A67"); // - Fill with pinkish purple
  } else if (currentTemp >= 16 && currentTemp < 25){ // - Between 16 and 25
    fill("#AD0938"); // - Fill with orangeish red
  } else if (currentTemp >= 25){ // - Above 25
    fill("#E10808"); // - Fill with red
  }
  rect(280, 100, 65, 10, 20); // either way, draw circle

  sqLine();
  extraSqs();

  fill("#5F4973"); // - Set rectangles color
  noStroke();
  rect(35, 175, 10, 495, 20);
  rect(740, 175, 10, 495, 20);
  rect(35, 175, 715, 10, 20);
  rect(35, 660, 715, 10, 20);
}

// Global variables and constants

const backgroundDiv = document.getElementById("background");

// Function to fetch and set the background image
const getBackground = () => {
  const apiUrl =
    "https://bing.biturl.top/?resolution=1920&format=json&index=0&mkt=zh-CN";

  fetch(apiUrl)
    .then((response) => {
      // Check if the response was successful
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to fetch background image.");
      }
    })
    .then((json) => {
      // Extract the image URL from the API response
      const imageUrl = json.url;
      // Set the background image URL and styling
      backgroundDiv.style.backgroundImage = `url('${imageUrl}')`;
      backgroundDiv.style.backgroundSize = "cover";
      backgroundDiv.style.backgroundPosition = "center";
      applyFadeInEffect();
    })
    .catch((error) => {
      console.error(error);
      // Set a fallback background image URL and styling
      backgroundDiv.style.backgroundImage =
        "url('https://wallpapercave.com/wp/wp3435425.jpg')";
      backgroundDiv.style.backgroundSize = "cover";
      applyFadeInEffect();
    });
};

const applyFadeInEffect = () => {
  backgroundDiv.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 1)";
  backgroundDiv.style.opacity = "0";
  backgroundDiv.offsetHeight;
  backgroundDiv.style.transition = "opacity 0.5s";
  backgroundDiv.style.opacity = "1";
  const background = document.getElementById("background");
  background.classList.add("show-fade");
};

// Call the function to fetch and set the initial background image
getBackground();

// Calculates the date of Easter for a given year. Uses the Meeus/Jones/Butcher algorithm.
function isEaster(date) {
  const year = date.getFullYear();
  const a = year % 19,
    b = Math.floor(year / 100),
    c = year % 100,
    d = Math.floor(b / 4),
    e = b % 4,
    f = Math.floor((b + 8) / 25),
    g = Math.floor((b - f + 1) / 3),
    h = (19 * a + b - d - g + 15) % 30,
    i = Math.floor(c / 4),
    k = c % 4,
    m = (32 + 2 * e + 2 * i - h - k) % 7,
    n = Math.floor((a + 11 * h + 22 * m) / 451),
    month = Math.floor((h + m - 7 * n + 114) / 31),
    day = ((h + m - 7 * n + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

// Function to update the time and greeting
function updateTime() {
  let timeElement = document.getElementById("timeDisplay");
  let currentTime = new Date();
  let formattedTime = currentTime.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  timeElement.textContent = formattedTime;

  let greetingMessage = document.getElementById("greetingMessage");
  let currentHour = currentTime.getHours();
  let greeting = "";

  // Determine the appropriate greeting based on the current hour
  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;

  // Customize the greeting based on specific dates
  if (
    currentMonth === 1 &&
    currentDate.getDate() === 1 &&
    currentDate.getDate() === 31
  ) {
    greeting = "Happy New Year!";
  } else if (
    currentMonth === 12 &&
    currentDate.getDate() >= 24 &&
    currentDate.getDate() <= 26
  ) {
    greeting = "Merry Christmas!";
  } else if (currentMonth === 3 && currentDate.getDate() === 4) {
    greeting = "Happy Anniversary!";
  } else if (currentMonth === 3 && currentDate.getDate() === 31) {
    greeting = "Happy Birthday!";
  } else if (
    currentMonth === isEaster(currentDate).getMonth() + 1 &&
    currentDay === isEaster(currentDate).getDate()
  ) {
    greeting = "Happy Easter!";
  }
  greetingMessage.textContent = greeting + ", Bragi.";
}
// Call the updateTime() function to set the initial time
updateTime();
// Use setInterval to update the time every second
setInterval(updateTime, 1000);

const quoteDiv = document.getElementById("quote");

// runs when the DOM loads
document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const quote = document.getElementById("quote");
  async function updateQuote() {
    try {
      // Fetch a random quote from the Quotable API
      const response = await fetch(
        "https://api.quotable.io/random?maxLength=30"
      );
      const data = await response.json();
      // Update DOM elements
      quote.innerHTML = '"' + data.content + '"' + "&nbsp";
    } catch (error) {
      //Error catch
      quote.innerHTML =
        '"' + "Mistakes are an opportunity to learn" + '"' + "&nbsp";
      console.error(error);
    }
  }
  // Call updateQuote once when page loads
  updateQuote();
}); 
  
const apiKey = "07NGR78GYWVQ0F5E"; // Replace with your marketstack API access key
//SPY,TSLA,

const spyUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=SPY&interval=5min&outputsize=compact&apikey=${apiKey}`;
let spyElement = document.getElementById("spyprice");

fetch(spyUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    let closePrice = data["Time Series (5min)"]["2023-06-01 19:55:00"]["4. close"];
    let SP500 = Math.ceil(parseInt(closePrice));
    SP500 = SP500.toString() + '0';
    spyElement.textContent = parseInt(SP500).toLocaleString('en-US', { style: 'currency', currency: 'USD',  maximumFractionDigits: 0 });
  })
  .catch((error) => {
    // Handle any errors that occurred during the fetch request
    console.error("Error:", error);
  });

const tslaUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=TSLA&interval=5min&outputsize=compact&apikey=${apiKey}`;
let tslaElement = document.getElementById("tslaprice");

fetch(tslaUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    let closePrice = data["Time Series (5min)"]["2023-06-01 19:55:00"]["4. close"];
    let TSLA = Math.ceil(parseInt(closePrice));
    tslaElement.textContent = TSLA.toLocaleString('en-US', { style: 'currency', currency: 'USD',  maximumFractionDigits: 0 });
  })
  .catch((error) => {
    // Handle any errors that occurred during the fetch request
    console.error("Error:", error);
  });

  const API_BASE_URL = 'https://api.coingecko.com/api/v3';
  let btcElement = document.getElementById("btcprice");
  let ethElement = document.getElementById("ethprice");
  let solElement = document.getElementById("solprice");
  
// Example: Get current Bitcoin price in USD
fetch(`${API_BASE_URL}/simple/price?ids=bitcoin&vs_currencies=usd`)
  .then(response => response.json())
  .then(data => {
    const BTC = data.bitcoin.usd;
    btcElement.textContent = BTC.toLocaleString('en-US', { style: 'currency', currency: 'USD',  maximumFractionDigits: 0 });
  })
  .catch(error => console.error('Error:', error));
fetch(`${API_BASE_URL}/simple/price?ids=ethereum&vs_currencies=usd`)
  .then(response => response.json())
  .then(data => {
    const ETH = data.ethereum.usd;
    ethElement.textContent = ETH.toLocaleString('en-US', { style: 'currency', currency: 'USD',  maximumFractionDigits: 0 });
  })
  .catch(error => console.error('Error:', error));
fetch(`${API_BASE_URL}/simple/price?ids=solana&vs_currencies=usd`)
  .then(response => response.json())
  .then(data => {
    const SOL = data.solana.usd;
    solElement.textContent = SOL.toLocaleString('en-US', { style: 'currency', currency: 'USD',  maximumFractionDigits: 2 });
  })
  .catch(error => console.error('Error:', error));
// Function declarations

// Event listeners

// Function invocations

// Other code and logic
// ...

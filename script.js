const backgroundDiv = document.getElementById("background");

// Function to fetch and set the background image
const getBackground = () => {
  // Check if there's a cached image and it was fetched today
  const cachedImage = localStorage.getItem('backgroundImage');
  const cachedDate = localStorage.getItem('backgroundImageDate');
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  if (cachedImage && cachedDate === today) {
    // Use the cached image
    setBackgroundImage(cachedImage);
    applyFadeInEffect();
  } else {
    // Fetch a new image
    const apiUrl =
      "https://bing.biturl.top/?resolution=1920&format=json&index=0&mkt=zh-CN";

    fetch(apiUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch background image.");
        }
      })
      .then((json) => {
        const imageUrl = json.url;
        setBackgroundImage(imageUrl);
        // Cache the image URL and the current date
        localStorage.setItem('backgroundImage', imageUrl);
        localStorage.setItem('backgroundImageDate', today);
        applyFadeInEffect();
      })
      .catch((error) => {
        console.error(error);
        setBackgroundImage("https://wallpapercave.com/wp/wp3435425.jpg");
        applyFadeInEffect();
      });
  }
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

const setBackgroundImage = (imageUrl) => {
  backgroundDiv.style.backgroundImage = `url('${imageUrl}')`;
  backgroundDiv.style.backgroundSize = "cover";
  backgroundDiv.style.backgroundPosition = "center";
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

// Fetch the SPY stock price from Alpha Vantage API
const apiKey = "07NGR78GYWVQ0F5E";
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
    let timeSeries = data["Time Series (5min)"];
    let firstTimestampKey = Object.keys(timeSeries)[0];
    let closePrice = timeSeries[firstTimestampKey]["4. close"];
    let SP500 = Math.ceil(parseInt(closePrice));
    SP500 = SP500.toString() + "0";
    spyElement.textContent = parseInt(SP500).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Fetch the TSLA stock price from Alpha Vantage API
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
    let timeSeries = data["Time Series (5min)"];
    let firstTimestampKey = Object.keys(timeSeries)[0];
    let closePrice = timeSeries[firstTimestampKey]["4. close"];
    let TSLA = Math.ceil(parseInt(closePrice));
    tslaElement.textContent = TSLA.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Fetching cryptocurrency prices
const API_BASE_URL = "https://api.coingecko.com/api/v3";
let btcElement = document.getElementById("btcprice");
let ethElement = document.getElementById("ethprice");
let solElement = document.getElementById("solprice");

// Fetch Bitcoin price from CoinGecko API
fetch(`${API_BASE_URL}/simple/price?ids=bitcoin&vs_currencies=usd`)
  .then((response) => response.json())
  .then((data) => {
    const BTC = data.bitcoin.usd;
    btcElement.textContent = BTC.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
  })
  .catch((error) => console.error("Error:", error));

// Fetch Ethereum price from CoinGecko API
fetch(`${API_BASE_URL}/simple/price?ids=ethereum&vs_currencies=usd`)
  .then((response) => response.json())
  .then((data) => {
    const ETH = data.ethereum.usd;
    ethElement.textContent = ETH.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
  })
  .catch((error) => console.error("Error:", error));

// Fetch Solana price from CoinGecko API
fetch(`${API_BASE_URL}/simple/price?ids=solana&vs_currencies=usd`)
  .then((response) => response.json())
  .then((data) => {
    const SOL = data.solana.usd;
    solElement.textContent = SOL.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    });
  })
  .catch((error) => console.error("Error:", error));

const notepad = document.getElementById("notepad");
const notepadContainer = document.getElementById("notepad-container");
const notecache = localStorage.getItem("notecache");

document.addEventListener("DOMContentLoaded", function() {
  notepad.value = notecache
});

notepadContainer.addEventListener("click", function() {
  notepad.focus();
});
notepad.addEventListener("input", function() {
  const notepadContent = notepad.value;
  localStorage.setItem("notecache", notepadContent);; // Display the content of the notepad
});
  
  
document.getElementById("searchForm").onsubmit = function () {
  var searchInput = document.getElementById("search").value;

  // Check if the input is a URL (simple version)
  if (searchInput.indexOf(".") !== -1 && searchInput.indexOf(" ") === -1) {
    // If it's a URL, redirect to it
    if (!/^https?:\/\//i.test(searchInput)) {
      searchInput = "http://" + searchInput;
    }
    window.location.href = searchInput;
    return false; // Prevent form submission to Google
  }
};

window.addEventListener("load", function () {
  const div1 = document.querySelector("#markets");
  const div2 = document.querySelector("#weather");

  function matchHeight() {
    const div1Height = div1.offsetHeight;
    div2.style.height = div1Height + "px";
  }
  matchHeight();
  window.addEventListener("resize", matchHeight);
});

const dateDiv = document.getElementById("date");
const currentDate = new Date().toLocaleDateString("is-IS", {
  weekday: "short",
  day: "numeric",
  month: "long",
});

dateDiv.textContent = currentDate;

const weatherSymbols = {
  'few clouds': 'weather-partly-cloudy.png',
  'scattered clouds': 'weather-partly-cloudy.png',
  'broken clouds': 'weather-overcast.png',
  'overcast clouds': 'weather-overcast.png',
  'clear sky': 'weather-sunny.png',
  'fog': 'weather-overcast.png',
  'mist': 'weather-overcast.png',
  'heavy shower snow': 'weather-very-snowy.png',
  'shower snow': 'weather-snowy.png',
  'light shower snow': 'weather-snowy.png',
  'rain and snow': 'weather-very-rainy.png',
  'light rain and snow': 'weather-rainy.png',
  'shower sleet': 'weather-very-rainy.png',
  'light shower sleet': 'weather-rainy.png',
  'sleet': 'weather-very-rainy.png',
  'heavy snow': 'weather-very-snowy.png',
  'snow': 'weather-snowy.png',
  'light snow': 'weather-snowy.png',
  'light rain': 'weather-rainy.png',
  'moderate rain': 'weather-rainy.png',
  'heavy intensity rain': 'weather-very-rainy.png',
  'very heavy rain': 'weather-very-rainy.png',
  'extreme rain': 'weather-very-rainy.png',
  'freezing rain': 'weather-very-rainy.png',
  'light intensity shower rain': 'weather-rainy.png',
  'shower rain': 'weather-rainy.png',
  'heavy intensity shower rain': 'weather-very-rainy.png',
  'ragged shower rain': 'weather-very-rainy.png',
  'light intensity drizzle': 'weather-rainy.png',
  'drizzle': 'weather-rainy.png',
  'heavy intensity drizzle': 'weather-very-rainy.png',
  'light intensity drizzle rain': 'weather-rainy.png',
  'drizzle rain': 'weather-rainy.png',
  'heavy intensity drizzle rain': 'weather-very-rainy.png',
  'shower rain and drizzle': 'weather-very-rainy.png',
  'heavy shower rain and drizzle': 'weather-very-rainy.png',
  'shower drizzle': 'weather-rainy.png',
};

// Get user's location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // Use latitude and longitude to fetch weather data
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=0aa0ea33dc5d5e38d219e9f44f5c30d1&units=metric`;

      fetch(weatherUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Extract the desired values from the data
          const main = data.weather[0].main;
          let description = data.weather[0].description;
          const temp = data.main.temp.toFixed(0);
          const feelsLike = data.main.feels_like.toFixed(0);
          const speed = data.wind.speed.toFixed(1);

          // If description is over 20 characters, use main instead
          if (description.length > 20) {
            description = main;
          }

          // Update the divs with the extracted data
          document.getElementById("weatherdescription").textContent =
            description.toUpperCase();

          document.getElementById("temp").textContent = `${temp}°C`;
          document.getElementById(
            "feelslike"
          ).textContent = `Feels like ${feelsLike}°C`;
          document.getElementById("wind").textContent = `${speed}m/s`;

          // Lookup the weather symbol and update image source
          let symbol = weatherSymbols[description.toLowerCase()];
          if (!symbol) {
            symbol = 'weather-error-catch.png'; // Use error catch image if no mapping was found
          }
          document.getElementById('wsymbol').src = `images/${symbol}`;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    (error) => {
      console.error("Error getting user's location:", error);
      // Continue with default location (Keflavik)
      const wlocation = "keflavik";
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${wlocation}&appid=0aa0ea33dc5d5e38d219e9f44f5c30d1&units=metric`;
      // Fetch weather data using default location
      fetchWeatherData(weatherUrl);
    }
  );
} else {
  console.error("Geolocation is not supported by this browser");
  // Continue with default location (Keflavik)
  const wlocation = "keflavik";
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${wlocation}&appid=0aa0ea33dc5d5e38d219e9f44f5c30d1&units=metric`;
  // Fetch weather data using default location
  fetchWeatherData(weatherUrl);
}

function fetchWeatherData(url) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Extract the desired values from the data
      const main = data.weather[0].main;
      let description = data.weather[0].description;
      const temp = data.main.temp.toFixed(0);
      const feelsLike = data.main.feels_like.toFixed(0);
      const speed = data.wind.speed.toFixed(1);

      // If description is over 20 characters, use main instead
      if (description.length > 20) {
        description = main;
      }

      // Update the divs with the extracted data
      document.getElementById("weatherdescription").textContent =
        description.toUpperCase();

      document.getElementById("temp").textContent = `${temp}°C`;
      document.getElementById(
        "feelslike"
      ).textContent = `Feels like ${feelsLike}°C`;
      document.getElementById("wind").textContent = `${speed}m/s`;

      // Lookup the weather symbol and update image source
      let symbol = weatherSymbols[description.toLowerCase()];

      // conditional for the windy symbol
      if ((main.toLowerCase() === "clouds" || main.toLowerCase() === "clear") && parseFloat(speed) > 14.9) {
        symbol = "weather-windy.png";
      }
      if (!symbol) {
        symbol = 'weather-error-catch.png'; // Use error catch image if no mapping was found
      }
      document.getElementById('wsymbol').src = `images/${symbol}`;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}


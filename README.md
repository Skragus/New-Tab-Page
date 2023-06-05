# New-Tab-Page

Project#003

The custom New Tab page includes a daily background image, a greeting message, a clock, a daily quote, market prices, a weather widget, bookmarks, and a notepad. I learned alot about concepts I had not exoplored before, with an emphasis on pulling and manipulating data from APIs and caching. This provided me a great learning opportunity to delve into the world of APIs and asynchronous JavaScript.

Lessons Learned
I learned a lot about APIs and asynchronous JavaScript, client-side data storage, handling user location data, and creating visually appealing and dynamic webpages.

The project was also a valuable lesson in planning and research. For each API used, I had to read the documentation, understand the rate limits and data formats, and write the code accordingly.



Features

Daily Background
The New Tab page fetches a new high-resolution background image every day from the Bing Image API. Implementing this feature was my first real interaction with APIs, and it was enlightening to learn how to make HTTP requests using JavaScript's fetch function and then display the fetched image as a background. I also learned how to handle errors, in case the API request fails.

Clock, Greeting Message, and Current Date
The page includes a clock and a personalized greeting message based on the time of day and some holidays. I used JavaScript's Date object to access the current date and time, and updated the DOM in real time using setInterval. This not only enhanced my understanding of JavaScript's timing events but also helped me to integrate dynamic content into a webpage. I also saw a glimpse into the reasoning for using libraries and modules since I had to find a function to check weather it is easter and it was just clunky compared to using a library with the function included, something to look into in my next few projects.

Daily Quote
The page fetches a new inspirational quote every day from the Quote of the Day API. This helped me further solidify my understanding of asynchronous JavaScript and handling API responses.

Search bar
I included a minimalistic search bar so the page can actually be properly used as a newtab page, when the page loads it automatically focuses on the bar so the user can immedietly start to google or type a url just like they are used to on the regular newtab page.

Market Prices
The page displays market prices for S&P500, TSLA, BTC, ETH, and SOL using the AlphaVantage and CoinGecko APIs. This project helped me understand how to handle rate limitations of APIs, how to parse JSON data, and how to update the DOM dynamically.

Weather
The page uses the OpenWeather API to display current weather conditions, temperature, and forecast based on the user's location. This was a challenging aspect of the project as it involved handling user location data responsibly and dealing with the intricacies of the weather API. I also used custom icons not from Openweather so I had to match them up to the api data which was alot of work since there are quite a few icons.

Notepad
The notepad feature allows users to jot down quick notes. This was implemented using HTML's textarea tag and JavaScript's localStorage to save the notes persistently. I learned a lot about client-side data storage and manipulation during this part of the project. Which I used to go back and cache the daily image once per day so it loads quicker once cached.

Bookmarking Capabilities
The page also includes quick links to frequently visited sites, improving user accessibility and saving time. These bookmarks were implemented using simple HTML and CSS..




APIs Used
Bing Image API: Used to fetch daily background images.
Quote of the Day API: Used to fetch the daily quote.
OpenWeather API: Used to retrieve weather data.
CoinGecko API: Used for cryptocurrency data.
AlphaVantage API: Used for market data.

Icons
Weather symbols & Landing page: Icons from icons8.com.
Notepad symbol: Icon from cleanpng
Bookmark symbols: from respective sites

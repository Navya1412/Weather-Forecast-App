// 1st attempt 
// const apiKey = 'e7f2a44070f4f734b1ba8145c077a931';

// async function getWeather() {
//   const postCode = document.getElementById('zipCodeInput').value;

//   if (postCode) {
//     try {
//       const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${postCode}&appid=${apiKey}&units=metric`);
//       const data = await response.json();

//       if (response.ok) {
//         displayWeather(data);
//       } else {
//         throw new Error(data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching weather:', error.message);
//       displayError('Error fetching weather. Please try again.');
//     }
//   } else {
//     displayError('Please enter a valid zip code.');
//   }
// }

// function displayWeather(data) {
//   const weatherResult = document.getElementById('weatherResult');

//   const description = data.weather[0].description;
//   const temperature = data.main.temp;
//   const cityName = data.name;
//   const humid = data.main.humidity;
//   const visible = data.visibility;
//   const speed = data.speed;

//   weatherResult.innerHTML = `<p>Weather in ${cityName}: ${description}</p>
//                             <p>Temperature: ${temperature}°C</p>
//                             <p> Humidity: ${humid} </p>
//                             <p> Visibility: ${visible} </p>
//                             <p> Wind Speed: ${speed} </p>`;
// }

// function displayError(message) {
//   const weatherResult = document.getElementById('weatherResult');
//   weatherResult.innerHTML = `<p style="color: red;">${message}</p>`;
// }




// 2nd attempt - changed zipcode to postcode as the function would only work when for US postcodes
// const apiKey = 'e7f2a44070f4f734b1ba8145c077a931';

// async function getWeather() {
//   const postcode = document.getElementById('postcodeInput').value;

//   if (postcode) {
//     try {
//       const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${postcode}&appid=${apiKey}&units=metric`);
//       const data = await response.json();

//       if (response.ok) {
//         displayWeather(data);
//       } else {
//         throw new Error(data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching weather:', error.message);
//       displayError('Error fetching weather. Please try again.');
//     }
//   } else {
//     displayError('Please enter a valid postcode.');
//   }
// }

// function displayWeather(data) {
//   const weatherResult = document.getElementById('weatherResult');

//   const description = data.weather[0].description;
//   const temperature = data.main.temp;
//   const cityName = data.name;

//   weatherResult.innerHTML = `<p>Weather in ${cityName}: ${description}</p>
//                             <p>Temperature: ${temperature}°C</p>`;
// }

// function displayError(message) {
//   const weatherResult = document.getElementById('weatherResult');
//   weatherResult.innerHTML = `<p style="color: red;">${message}</p>`;
// }



const openWeatherApiKey = 'e7f2a44070f4f734b1ba8145c077a931';

async function getWeather() {
  const postcode = document.getElementById('postcodeInput').value;

  if (postcode) {
    try {
      const coordinates = await getCoordinates(postcode);
      const weatherData = await fetchWeatherData(coordinates);

      if (weatherData) {
        displayWeather(weatherData);
      } else {
        throw new Error('Weather data not found.');
      }
    } catch (error) {
      console.error('Error:', error.message);
      displayError('Error fetching weather. Please try again.');
    }
  } else {
    displayError('Please enter a valid postcode.');
  }
}

async function getCoordinates(postcode) {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${postcode}, Australia`); //referred to ChatGPT
  const data = await response.json();

  if (response.ok && data.length > 0) {
    return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
  } else {
    throw new Error('Could not retrieve coordinates.');
  }
}

async function fetchWeatherData(coordinates) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${openWeatherApiKey}&units=metric`);
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    throw new Error('Could not retrieve weather data.');
  }
}

// the next set of codes are to get the background color to changed based on the current temperature but for sure reason they do not seem to work
// function changeBackground(temperature){
//   const weatherResult = document.getElementById('weatherResult');

//   if(temperature>=30){
//     weatherResult.style.background = 'linear-gradient(to bottom, #b81313, #be3e0d, #c35a0d, #c67315, #c88a25)' ;
//   } else if (temperature>=20){
//     weatherResult.style.background = 'linear-gradient(to top, #6bd3f2, #2fbcf2, #00a3f1, #0087eb, #3c68dc)' ;
//   } else if (temperature>=10){
//     weatherResult.style.background = 'linear-gradient(to top, #5760d7, #5059d9, #4a52da, #434bdb, #3c43dc)' ;
//   } else {
//     weatherResult.style.background = 'linear-gradient(to bottom, #000a93, #1e0a96, #2d0b99, #3a0b9b, #450c9e)' ;
//   }
// }

function displayWeather(data) {
  const weatherResult = document.getElementById('weatherResult');

  const description = data.weather[0].description;
  const temperature = data.main.temp;
  const cityName = data.name;
  const humidity = data.main.humidity;
  const visibility = data.visibility;
  const windSpeed = data.wind.speed;
  const rainVol = data.rain;
  const time = data.timezone;
  const sunrise = data.sys.sunrise;
  const sunset = data.sys.sunset;
  const minTemp = data.main.temp_min;
  const maxTemp = data.main.temp_max;

  weatherResult.innerHTML = `<p>Weather in ${cityName}: </p>
                            <p>${description}</p>
                            <p>Temperature: ${temperature}&degC</p>
                            <p>Humidity: ${humidity}%</p>
                            <p>Visibility: ${visibility} meters</p>
                            <p>Wind Speed: ${windSpeed} m/s</p>
                            <p>Rain Volume: ${rainVol} </p>
                            <p>Time Zone: ${time}</p>
                            <p>Sunrise: ${sunrise}</p>
                            <p>Sunset: ${sunset}</p>
                            <p>Minimum Temperature: ${minTemp}&degC</p>
                            <p>Maximum Temperature: ${maxTemp}&degC</p>`;
}

function displayError(message) {
  const weatherResult = document.getElementById('weatherResult');
  weatherResult.innerHTML = `<p style="color: red;">${message}</p>`;
}
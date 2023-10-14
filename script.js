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

function displayWeather(data) {
  const weatherResult = document.getElementById('weatherResult');

  const description = data.weather[0].description;
  const temperature = data.main.temp;
  const cityName = data.name;
  const humidity = data.main.humidity;
  const visibility = data.visibility;
  const windSpeed = data.wind.speed;

  weatherResult.innerHTML = `<p>Weather in ${cityName}: ${description}</p>
                            <p>Temperature: ${temperature}°C</p>
                            <p>Humidity: ${humidity}%</p>
                            <p>Visibility: ${visibility} meters</p>
                            <p>Wind Speed: ${windSpeed} m/s</p>`;
}

function displayError(message) {
  const weatherResult = document.getElementById('weatherResult');
  weatherResult.innerHTML = `<p style="color: red;">${message}</p>`;
}

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



const apiKey = 'e7f2a44070f4f734b1ba8145c077a931';

async function getWeather() {
  const postcode = document.getElementById('postcodeInput').value;

  if (postcode) {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${postcode}&appid=${apiKey}&units=metric`);
      const data = await response.json();

      if (response.ok) {
        displayWeather(data);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error fetching weather:', error.message);
      displayError('Error fetching weather. Please try again.');
    }
  } else {
    displayError('Please enter a valid postcode.');
  }
}

function displayWeather(data) {
  const weatherResult = document.getElementById('weatherResult');

  const description = data.weather[0].description;
  const temperature = data.main.temp;
  const cityName = data.name;

  weatherResult.innerHTML = `<p>Weather in ${cityName}: ${description}</p>
                            <p>Temperature: ${temperature}°C</p>`;
}

function displayError(message) {
  const weatherResult = document.getElementById('weatherResult');
  weatherResult.innerHTML = `<p style="color: red;">${message}</p>`;
}

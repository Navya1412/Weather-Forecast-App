// const apiKey = 'd130fb1b1b7676ce825664e9b2145e4c';

function getWeather() {
  const zipCode = document.getElementById('zipCodeInput').value;

  const lat = '-35.282001';
  const long = '149.128998';
//   const part = 'current';
  const key = 'e7f2a44070f4f734b1ba8145c077a931';

  if (zipCode) {
    // const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude=${part}&appid=${key}`;
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon={long}&appid=${key}'
    

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        displayWeather(data);
      })
      .catch(error => console.error('Error fetching weather:', error));
  } else {
    alert('Please enter a valid zip code.');
  }
}

function displayWeather(data) {
  const weatherResult = document.getElementById('weatherResult');

  if (data.cod === '404') {
    weatherResult.innerHTML = `<p>Invalid zip code. Please try again.</p>`;
  } else {
    const description = data.weather.description;
    const temperature = data.main.temp;
    const cityName = data.name;

    weatherResult.innerHTML = `<p>Weather in ${cityName}: ${description}</p>
                              <p>Temperature: ${temperature}°C</p>`;
  }
}

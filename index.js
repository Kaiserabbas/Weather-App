const form = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const metricCheckbox = document.getElementById('metricCheckbox');
const imperialCheckbox = document.getElementById('imperialCheckbox');
const weatherResult = document.getElementById('weatherResult');

const apiKey = '0fd89f3c751f217b80034bb11909263a';

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const city = cityInput.value;
  const units = metricCheckbox.checked ? 'metric' : 'imperial';
  getWeather(city, units);
});

function getWeather(city, units) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const { name, main, weather } = data;
      const temperature = main.temp;
      const weatherDescription = weather[0].description;

      const temperatureElement = document.createElement('p');
      temperatureElement.textContent = `Temperature: ${temperature}°${getUnitSymbol(
        units
      )}`;
      if (temperature > 30) {
        temperatureElement.style.color = 'red';
      } else if (temperature <= 30 && temperature >= 10) {
        temperatureElement.style.color = 'green';
      } else {
        temperatureElement.style.color = 'blue';
      }

      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = `Description: ${weatherDescription}`;

      weatherResult.innerHTML = '';
      weatherResult.appendChild(temperatureElement);
      weatherResult.appendChild(descriptionElement);
    })
    .catch((error) => {
      weatherResult.innerHTML =
        '<p>Error fetching weather data. Please try again later.</p>';
    });
}

function getUnitSymbol(units) {
  switch (units) {
    case 'metric':
      return 'C';
    case 'imperial':
      return 'F';
    default:
      return '';
  }
}

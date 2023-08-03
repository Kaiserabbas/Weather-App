import setBackgroundFromUnsplash from './modules/background.js';
import './modules/index.css';

setBackgroundFromUnsplash();

const form = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const metricCheckbox = document.getElementById('metricCheckbox');
const imperialCheckbox = document.getElementById('imperialCheckbox');
const weatherResult = document.getElementById('weatherResult');

const apiKey = '0fd89f3c751f217b80034bb11909263a';
form.addEventListener('submit', (event) => {
  const city = cityInput.value;
  event.preventDefault();
  const capitalizeFLetter = (city) => {
    city[0].toUpperCase() + city.slice(1);
  };
  capitalizeFLetter(city);

  const units = metricCheckbox.checked ? 'metric' : 'imperial';
  getWeather(city, units);
});

const getWeather = async (city, units) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const { name, main, weather, wind } = data;
      const temperature = main.temp;
      const weatherDescription = weather[0].description;
      const icon = weather[0].icon;
      const humidity = main.humidity;
      const speed = wind.speed;

      const temperatureElement = document.createElement('p');
      temperatureElement.textContent = `Temperature: ${temperature}°${getUnitSymbol(
        units
      )}`;
      temperatureElement.style.color = temperature > 25 ? 'red' : 'green';

      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = weatherDescription;
      if (temperature > 30) {
        temperatureElement.style.color = 'red';
      } else if (temperature <= 30 && temperature >= 10) {
        temperatureElement.style.color = 'green';
      } else {
        temperatureElement.style.color = 'blue';
      }

      const humidityElement = document.createElement('p');
      humidityElement.textContent = `Humidity: ${humidity}%`;

      const speedElement = document.createElement('p');
      speedElement.textContent = `Wind Speed: ${speed} m/s`;

      const iconElement = document.createElement('img');
      iconElement.className = 'icon';
      iconElement.src = `https://openweathermap.org/img/w/${icon}.png`;
      iconElement.alt = weatherDescription;

      weatherResult.innerHTML = '';
      weatherResult.appendChild(temperatureElement);
      weatherResult.appendChild(descriptionElement);
      weatherResult.appendChild(humidityElement);
      weatherResult.appendChild(speedElement);
      weatherResult.appendChild(iconElement);
    })
    .catch((error) => {
      weatherResult.innerHTML =
        '<p>Error fetching weather data. Please try again later.</p>';
    });
  // Fetch a random image from Unsplash and set it as the body background
};

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

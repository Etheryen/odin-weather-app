function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function kelvinToCelcius(kelvin) {
  return kelvin - 273.15;
}

function changeBg(temp) {}

async function getWeather(location) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=0b53b39c2837c4270bc9d24c7df45fc1`
  );
  const weatherData = await response.json();
  return weatherData;
}

async function getNeededData(location) {
  const { name, main, weather } = await getWeather(location);
  main.temp = Math.round(kelvinToCelcius(main.temp));
  return { name, main, weather: weather[0] };
}

const info = document.querySelector('#info');
const search = document.querySelector('#search');
const input = document.querySelector('#locationSearch');

const locationName = document.querySelector('#locationName');
const icon = document.querySelector('#icon');
const desc = document.querySelector('#desc');
const temp = document.querySelector('#temp');

search.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  info.style.display = 'flex';
  const weatherData = await getNeededData(input.value);
  locationName.innerHTML = weatherData.name;
  icon.style.backgroundImage = `url(https://openweathermap.org/img/wn/${weatherData.weather.icon}@4x.png)`;
  desc.innerHTML = capitalize(weatherData.weather.description);
  temp.innerHTML = weatherData.main.temp;
  input.value = '';
});

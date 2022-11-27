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

getNeededData('dubai').then((data) => console.log(data));

const search = document.querySelector('#search');
const input = document.querySelector('#locationSearch');

const locationName = document.querySelector('#locationName');
const temp = document.querySelector('#temp');

search.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const weatherData = await getNeededData(input.value);
  locationName.innerHTML = weatherData.name;
  temp.innerHTML = weatherData.main.temp;
});

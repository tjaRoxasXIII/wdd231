const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=28.23&lon=-81.64&units=imperial&appid=e09f9c17d5f800e31905962d2c8b330d';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=28.23&lon=-81.64&units=imperial&appid=e09f9c17d5f800e31905962d2c8b330d';
const currentTemp = document.querySelector('#weather');
let currentWeather = document.createElement('span');

let weatherIcon = document.createElement('img');
const captionDesc = document.createElement('figcaption');
currentTemp.appendChild(weatherIcon);

const forecastContainer = document.querySelector('#forecast');

async function apiFetch() {
    try {
        const weatherResponse = await fetch(weatherUrl);
        const forecastResponse = await fetch(forecastUrl);
        if (weatherResponse.ok) {
            const weatherData = await weatherResponse.json();
            const forecastData = await forecastResponse.json();
            console.log(weatherData);
            displayCurrentWeather(weatherData);
            displayForecast(forecastData);
        }
        else {
            throw Error(await weatherResponse.text());
        }
    } catch (error) {
        console.error(error);
    }
}
function displayCurrentWeather(data) {
    currentWeather.innerHTML = `${data.main.temp}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = `${desc}`;

    currentTemp.appendChild(captionDesc);
    currentTemp.appendChild(currentWeather);
}

function displayForecast(data) {
    let dayIndex = 4;
    for (let i = 0; i < 3; i++) {
        highArray = [];
        lowArray = [];

        for(let i = 0; i < 8; i++) {
            highArray.push(data.list[dayIndex + i].main.temp_max);
            lowArray.push(data.list[dayIndex + i].main.temp_min);
        }

        const forecastDay = document.createElement('div');
        const highLow = document.createElement('span');
        const dayDesc = document.createElement('p');

        const rawDate = data.list[dayIndex].dt_txt.split(" ")[0];
        const [year, month, day] = rawDate.split("-");
        forecastDay.innerHTML = `<h4>${month}/${day}</h4>`;

        highLow.innerHTML = `${Math.round(Math.min(...lowArray))} &deg;F / ${Math.round(Math.max(...highArray))} &deg;F`;

        forecastDay.appendChild(dayDesc);
        forecastDay.appendChild(highLow);
        forecastContainer.appendChild(forecastDay);

        dayIndex += 8;

    }
}

apiFetch();
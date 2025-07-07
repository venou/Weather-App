document.addEventListener('DOMContentLoaded', () => {
    const cityinput = document.getElementById('city-input');
    const getweatherbtn = document.getElementById('get-weather');
    const weatherinfo = document.getElementById('weather-info');
    const citynameDisplay = document.getElementById('city-name');
    const temperatureDisplay = document.getElementById('temperature');
    const descriptionDisplay = document.getElementById('description');
    const errormessage = document.getElementById('error-message');

    const API_KEY = "851563c92e4f1ea45cda629e7f912442"  //env Variables

    getweatherbtn.addEventListener('click', async () => {
        const city = cityinput.value.trim()
        if (!city) return;


        // it may through an error
        // server/database is always in another continent    

        try {
            const weatherdata = await fetchWeatherData(city)
            displayWeatherData(weatherdata);
        } catch (error) {
            showError()
        }

    })

    async function fetchWeatherData(city) {
        //get weather data

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`

        const response = await fetch(url);
        console.log(typeof response);
        console.log('RESPONSE ', response);

        if (!response.ok) {
            throw new Error(" city not found");

        }
        const data = await response.json()
        return data

    }

    function displayWeatherData(weatherdata) {
        console.log(weatherdata);
        const { name, main, weather } = weatherdata;
        citynameDisplay.textContent = name;
        temperatureDisplay.textContent = `Temperature : ${main.temp}`;
        descriptionDisplay.textContent = ` Weather : ${weather[0].description}`;


        // Unlock the display
        weatherinfo.classList.remove('hidden');
        errormessage.classList.add('hidden')
    }

    function showError() {
        weatherinfo.classList.remove('hidden');
        errormessage.classList.add('hidden');
    }

})
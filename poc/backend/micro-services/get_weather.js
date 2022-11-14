const axios = require('axios')
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'c7b9710a18a6fa3aa3a975cfa5f8232a';
const LOCATION_CODE = '48.8534&lon=2.3488';
const FULL_API_URL = `${API_URL}?lat=${LOCATION_CODE}&appid=${API_KEY}`;

const mail = require('./mail_api');

axios
    .get(FULL_API_URL)
    .then(response => {
        const temperatureK = response.data.main.temp;
        const temperatureF = (temperatureK * 9) / 5 - 459.67;
        const temperatureC = temperatureK - 273.15;

        const weatherDisplay = temperatureC.toFixed(1);
        if (weatherDisplay <= 15) {
            console.log('brrrrrr')
            mail()
        }
        console.log('not that cold')
    })
    .catch(error => console.log("Error", error));
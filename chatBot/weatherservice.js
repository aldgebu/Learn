const axios = require('axios');
require('dotenv').config();

const apiKey = process.env.apiKey;

class WeatherService {
    async getWeather(lat, lon) {
        const url = 'http://api.weatherapi.com/v1/current.json?key=' + apiKey + '&q=' + lat + ',' + lon + '&aqi=no';
        const request = await axios.get(url);
        return request.data;
    }
}

module.exports = WeatherService;
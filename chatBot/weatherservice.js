const axios = require('axios');
require('dotenv').config();

const apiKey = process.env.apiKey;
class WeatherService{
    async getweather(lat, lon){
        const url = 'http://api.weatherapi.com/v1/current.json?key=' + apiKey + '&q=' + lat + ',' + lon + '&aqi=no';
        return await axios.get(url);
    }
}

module.exports = WeatherService;
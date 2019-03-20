const fetch = require("node-fetch");
const cities = require('./city.json');
const urlBase = 'https://api.openweathermap.org/data/2.5/'
const secrets = require('./secrets.json');
const Discord = require('discord.js');

module.exports = {
    weatherReport: class {
        constructor(content) {
            this.cityName = content;
            if (this.cityName === undefined) {
                this.cityName = 'davis';
            }
            this.cityIdx = cities.findIndex( element => {
                return element.name.toLowerCase() === (this.cityName)
            });
            this.cityObj = cities[this.cityIdx]
            this.id = this.cityObj.id;
        }
        forecast5Weather(msg) {
            let url = urlBase + 'forecast?id=' + this.id + '&appid=' + secrets.weather_key + '&units=imperial';
            let city = this.cityObj.name;
            let country = this.cityObj.country;

            fetch(url).then(handleResponse).then(handleData).catch(handleError);

            function handleResponse(response) {
                return response.json().then(function (json) {
                    return response.ok ? json : Promise.reject(json);
                });
            }
            function handleData(data) {
                let weatherArr = data.list;
                let reply = '';
                let replyTemplate = ``;
                let temp = 0;
                weatherArr.forEach(element => {
                    temp = Math.round(element.main.temp);
                    replyTemplate = `Time: ${element.dt_txt}; Temperature: ${temp} F`;// Description: ${element.weather[0].main}`;
                    reply += replyTemplate + '\n';
                });
                //console.log(data);
                let forecast = new Discord.RichEmbed();
                forecast.setTitle(city + ', ' + country + ': 5 Day Forecast').setDescription(reply).setColor([Math.round(255*Math.random()),Math.round(255*Math.random()),Math.round(255*Math.random())]);
                msg.reply(forecast);
            }
            function handleError(error) {
                console.error(error);
            }
        }
    }
}
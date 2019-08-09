const request = require('request');

const getWeather = function(latitude, longitude, callbacks){
        const url = "https://api.darksky.net/forecast/833022029c6cfb411cb6a0022ef3f1e3/" + latitude + "," + longitude + "?units=si";
        
         request({url: url, json: true}, (error, response) => {
                const temp = response.body.currently.temperature;
                const summary = response.body.currently.summary;
                
                 callbacks(temp, summary);
        console.log(response.body.currently.summary + "and current temperature is: " + response.body.currently.temperature +" Degree Celsius");    
        });

}



module.exports = getWeather;
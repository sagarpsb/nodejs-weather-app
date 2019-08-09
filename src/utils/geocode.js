const request = require('request');
// const getWeather = require('./getWeather');

const geocode = (address, callback) => {
    const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ address +".json?access_token=pk.eyJ1Ijoic2FnYXJwc2IiLCJhIjoiY2p5d3o1NmpjMTJnMTNocGdyODc3N3AzdCJ9.xubC9JesUaJ8-uAtWFIpOQ";

        request({url: geocodeURL, json: true}, (error, response) => {

        if (error) {
            callback("Connection Failed!", undefined);           
        } else if (response.body.features.length == 0) {
            callback("Location Not Found!", undefined);         
        } else{
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                address: response.body.features[0].place_name
            });  
            
        }
    });
    
};

module.exports = geocode;
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const getWeather = require('./utils/getWeather');
const request = require('request');

const app = express();


// this is for HEROKU

const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)  //this line changes hbs defult directory 'views' to viewsPath.
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// app.get('', (req, res) => {
//     res.send('index.html');
// });

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'SamudraGupt'
    })
});

// app.get('/help', (req, res) => {
//     res.send('Hello Express, Plz Help Me!');
// });

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help me',
        name: 'IronMan'
    })
});

// app.get('/about', (req, res) => {
//     res.send('Hello there! I am Express.');
// });

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Chankya'
    })
});

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send("Please provide address!")
    }

    geocode(req.query.address, (error, {longitude, latitude, address} = {}) => {
        console.log("error: ", error);
        // console.log("Data: ", data); 
        if(error){
            return res.send({Error: 'Location not found!'});
        }

        getWeather(latitude, longitude, (temp, summary) => {
            res.send({
                // Data: data,
                temprature: temp,
                forecast: summary,
                location: req.query.address,
                address: address
            })
        });        
    });
});

// if any given link does not match
// we us * and if no match found, this will be rendered

app.get('/help/*', (req, res) => {
    
    res.render('404', {
        title: '404 Eroor!',
        name: 'ravan',
        errorMeassage: 'Help article not found'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Eroor!',
        name: 'akbar',
        errorMeassage: 'Page not found'
    })
});

app.listen(port, () => {
    console.log('Server is started on port' + port);
})
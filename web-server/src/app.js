const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require ('./utils/geocode');
const forecast = require ('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Torof'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Torof'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Torof'

    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, {longitude, latitude} = {}) => {
        if(error) {
            return res.send({
                error
            })
        } 

        forecast(latitude, longitude, (error, forecastData, location) => {
            if(error) {
                return res.send({
                    error
                })
            }
            return res.send({
                address: req.query.address,
                location,
                forecast: forecastData,
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render("404", {
        title: "404",
        name: "Torof",
        errorMessage: "Help article not found"
    })
})

app.get('*', (req, res) => {
    res.render("404", {
        title: "404",
        name: "Torof",
        errorMessage: "Page not found"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
}) 
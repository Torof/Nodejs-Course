// const request = require('postman-request');
// const geocode = require('./utils/geocode');
// const forecast = require('./utils/forecast');
import geocode from './utils/geocode.js';
import forecast from './utils/forecast.js';
import chalk from 'chalk'

const address = process.argv[2];

if(address === undefined) {
    console.log('Please provide an address');
} else {geocode(address, (error, {latitude, longitude, location} = {}) => {
    if(error) return console.log('Error: ', error);

    forecast(latitude, longitude, (error, forecastData) => {
        if(error) return console.log('Error: ', chalk.red(error));
        else {
            console.log(chalk.bold(location))
            console.log(forecastData);}
    })
})}






// const request = require('postman-request');
import request from 'postman-request';

const forecast = (longitude, latitude , callback) => {
    const url = "http://api.weatherstack.com/current?access_key=e5823f3dc79f76eec2959088c3a2577e&query=" + longitude + "," + latitude + "&units=m" ;

    request({url: url , json: true}, (error, response) => {
        if (error) {
            callback('unable to connect to weather api', undefined)
        } else if (response.body.error) {
            callback("unable to find location", undefined);
        } else {
            const current = response.body.current;
            callback(undefined, " It is currently " + current.temperature + " degrees, and it feels like " + current.feelslike + " degrees")
        }
    })}


export default  forecast;

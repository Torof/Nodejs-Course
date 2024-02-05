// const request = require('postman-request');
import request from 'postman-request';

const forecast = (longitude, latitude , callback) => {
    const url = "http://api.weatherstack.com/current?access_key=e5823f3dc79f76eec2959088c3a2577e&query=" + longitude + "," + latitude + "&units=m" ;

    request({url, json: true}, (error, {body}) => {
        
        if (error) {
            callback('unable to connect to weather api', undefined)
        } else if (body.error) {
            callback("unable to find location", undefined);
        } else {
            
            callback(undefined, " It is currently " + body.current.temperature + " degrees, and it feels like " + body.current.feelslike + " degrees")
        }
    })}


export default  forecast;

const request = require('postman-request');

const forecast = (longitude, latitude , callback) => {
    const url = "http://api.weatherstack.com/current?access_key=d54b3e5ad88c985fe649d3cc54233518&query=" + longitude + "," + latitude + "&units=m" ;

    request({url, json: true}, (error, {body}) => {
        
        if (error) {
            callback('unable to connect to weather api', undefined, undefined)
        } else if (body.error) {
            callback("unable to find location", undefined, undefined);
        } else {
            console.log(body);
            callback(
                undefined,
                
                body.current.weather_descriptions[0] 
                + ". It is currently " 
                + body.current.temperature 
                + " degrees, and it feels like " 
                + body.current.feelslike 
                + " degrees, with " 
                + body.current.humidity 
                + "% humidity",

                body.location.name 
                + ", " 
                + body.location.region 
                + ", "
                + body.location.country )
        }
    })}

module.exports =  forecast;

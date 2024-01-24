const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json/?access_token=pk.eyJ1IjoidG9yb2YxMyIsImEiOiJjbHJvbmdtcnQxaWNwMmttaHAyY2N2ZW15In0._6hkSpbsODIHkeO6UurHmA`;
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback("unable to connect to geocoding api", undefined)
        } else if (body.features.length === 0) {
            callback("unable to find location", undefined)
        } else {
            callback(undefined, {
                latitude: body.features[4].center[1],
                longitude: body.features[4].center[0],
                location: body.features[4].place_name
            })
        }
    })
}

module.exports = geocode;
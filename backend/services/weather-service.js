import request from 'node_modules/request-promise'

class WeatherService {

    constructor(redisConnector) {
        this._redisConnector = redisConnector
    }

    get_weather_from_cache(location) {
        return this._redisConnector.get(location)
            .then(data => {
                if (data === null) 
                    throw `${location} not found in cache`
                else
                    return data
            })
    }

    //mustoverride
    get_weather() {}

    //save new weather data for 1 hr
    set_weather_to_cache(location,weather) {
        return this._redisConnector.setExpire(location,weather,3600)
    }
}

export default class OpenWeatherMap extends WeatherService  {
    constructor(config, redisConnector) {
        super(redisConnector)
        //make sure config properties are set
        if (['url', 'APPID','icon_url'].every((property) => {
            return (property in config && config[property])
        }))
            this._config = config
        else
            throw new Error('URL or app_key is missing from configuration.')
    }

    //Retrieve weather from OpenWeatherMap (in fahrenheit)
    get_weather_from_api(location) {
        console.log('Getting data from OpenWeatherMap')
        const options = {
            uri: this._config.url + 'weather',
            qs: {
                q: location,
                APPID: this._config.APPID,
                units: "imperial"
            },
            json: true
        }
        const req = request.get(options)

        //After getting, save to cache
        req.then(data => {return this.set_weather_to_cache(location,data)})

        return req.catch(res => {
                if (res.error.cod === '404')
                    throw {
                        'cod': '400',
                        'message': 'Bad location'
                    }
                else
                    throw res.error
            })
    }

    get_weather(location) {
        // First check cache
        return this.get_weather_from_cache(location)
            .catch(err => {
                console.log(err)
                //Then go to API if not in cache
                return this.get_weather_from_api(location)
            })
            .then((res) => {
                return {
                    "location": res.name,
                    "icon": this._config.icon_url + res.weather[0].icon + '.png',
                    "temp": res.main.temp
                }
            })
    }
}
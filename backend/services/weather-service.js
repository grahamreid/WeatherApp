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

    set_weather_to_cache(location,weather) {
        return this._redisConnector.setExpire(location,weather,3600)
    }
}

export default class OpenWeatherMap extends WeatherService  {
    constructor(config, redisConnector) {
        super(redisConnector)
        if (['url', 'APPID'].every((property) => {
            return (property in config && config[property])
        }))
            this._config = config
        else
            throw new Error('URL or app_key is missing from configuration.')
    }

    get_weather_from_api(location) {
        console.log('Getting data from OpenWeatherMap')
        const options = {
            uri: this._config.url + 'weather',
            qs: {
                q: location,
                APPID: this._config.APPID
            },
            json: true
        }
        return request.get(options)
            .then((data) => {return this.set_weather_to_cache(location,data)})
    }

    get_weather(location) {
        return this.get_weather_from_cache(location)
            .catch(err => {
                console.log(err)
                return this.get_weather_from_api(location)
            })
    }
}
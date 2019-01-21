// Abstraction for weather service. This mainly serves the purpose of wrapping multiple weather calls for multiple locations.
// Could be refactored similar to the user model to be more of a data representation returned by the service
export default class Weather {
    constructor(weather_service, locations) {
        this._locations = locations
        this._weather_service = weather_service
    }
    
    get() {
        return Promise.all(this._locations.map(location => {
            return this._weather_service.get_weather(location)
        }))
    }
}
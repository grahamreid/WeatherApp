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
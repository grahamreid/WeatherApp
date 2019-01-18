export default class User {
    constructor(name) {
        this._name = name
        this._locations = ['first place']
    }
    
    //TODO: Add unit test
    //TODO: Throw specific error type for user already exists
    async get() {
        // throw new Error(`User ${this._name} does not exist.`)
        return this._name
    }

    async get_locations() {
        return this._locations
    }

    //TODO: try/catch
    async add_location(location) {
        return this.get_locations()
                .then(locations => {
                    locations.push(location)
                    return locations
                })
                .then(locations => {return this.save(locations)})
    }
    
    //TODO: Add unit test
    //TODO: check if name already exists
    //TODO: throw exception if name already exists
    //TODO: get location, append new, and then save to redis
    async save(locations) {
        this._locations = locations
        return this._locations
    }


}
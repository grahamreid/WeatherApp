export default class User {
    constructor(user_service, username) {
        this._username = username
        this._user_service = user_service
    }
    
    //TODO: Add unit test
    //TODO: Throw specific error type for user already exists
    get() {
        return this._user_service.get_user(this._username)
    }

    get_locations() {
        return this._user_service.get_locations(this._username)
    }

    //TODO: try/catch
    add_location(location) {
        return this.get_locations()
                .then(locations => {
                    locations.push(location)
                    return locations
                })
                .then(locations => this.save_locations(locations))
    }

    // create_new() {
    //     return this._user_service.create_user(this._username)
    // }

    save_locations(locations) {
        return this._user_service.set_locations(this._username, locations)
    }


}
export default class User {
    constructor(user_service, username) {
        this._username = username
        this._user_service = user_service
    }
    
    get() {
        return this._user_service.get_user(this._username)
    }

    get_locations() {
        return this._user_service.get_locations(this._username)
    }

    add_location(location) {
        return this.get_locations()
                .then(locations => {
                    locations.push(location)
                    return locations
                })
                .then(locations => this.save(locations))
    }

    save(locations) {
        return this._user_service.set_locations(this._username, locations)
    }


}
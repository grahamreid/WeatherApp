export default class UserService_Redis {
    constructor(redisConnector) {
        this._redisConnector = redisConnector
    }

    //Unit test this stuff, including invalid credentials
    
    get_user(username) {
        return this._redisConnector.get(username)
            .then(user_info => {
                if (user_info !== null) 
                    return user_info.username
                else
                    throw "Invalid Credentials"
            })
    }

    set_new_user(username) {
        return this._redisConnector.get(username)
            .then(user_info => {
                if (user_info !== null)
                    throw "User already exists!"
            })
            .then(() => {return this.set_user(username)})
    }

    // In another db, this would be a separate query, 
    // But since this is redis, just save it all together
    set_user(username) {
        return this.set_locations(username, [])
    }

    get_locations(username) {
        return this._redisConnector.get(username)
            .then(user_info => {
                if (user_info === null)
                    throw `User ${username} does not exist!`
                return user_info.locations
            })
    }

    set_locations(username, locations) {
        return this._redisConnector.set(username, {"username": username, "locations": locations})
    }
}
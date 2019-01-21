export default class UserService_Redis {
    constructor(redisConnector) {
        this._redisConnector = redisConnector
    }

    // Get user from redis. Make new user if doesn't exist.
    get_user(username) {
        return this._redisConnector.get(username)
            .then(user_info => {
                if (user_info !== null) 
                    return user_info.username
                else 
                    return this.set_user(username)
            })
            .then(() => {return username})
    }

    // In another db, this would be a separate query, 
    // But since this is redis, just save it all together
    set_user(username) {
        return this.set_locations(username, [])
    }

    // Get all locations user has added so far.
    get_locations(username) {
        return this._redisConnector.get(username)
            .then(user_info => {
                if (user_info === null)
                    throw `User ${username} does not exist!`
                return user_info.locations
            })
    }

    //save user's locations to redis
    set_locations(username, locations) {
        return this._redisConnector.set(username, {"username": username, "locations": locations})
    }
}
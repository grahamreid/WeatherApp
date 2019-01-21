import redis from 'redis'
import bluebird from 'bluebird'

bluebird.promisifyAll(redis)

export default class RedisConnector {
    constructor(config) {
        console.log(config);
        if (['host', 'port'].every((property) => {
            return (property in config && config[property])
        }))
            this._client = redis.createClient(config)
        else
            throw new Error('Host or port is missing in redis configuration.')
    }

    get(key) {
        return this._client.getAsync(key)
            .then(JSON.parse)
    }

    async set(key, value) {
        await this._client.setAsync(key, JSON.stringify(value))
    }

    async setExpire(key, value, ex) {
        return this._client.setAsync(key, JSON.stringify(value), "EX", ex)
    }
}
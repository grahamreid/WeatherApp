import express from 'express'
import config from 'app/config.json'
import User from 'app/models/user'
import Weather from 'app/models/weather'
import RedisConnector from 'app/connectors/redis-connector'
import UserService_Redis from 'app/services/user-service'
import OpenWeatherMap from 'app/services/weather-service'

let router = express.Router();

//initialize connectors and services
const redis_conn = new RedisConnector(config.redis)
const user_service = new UserService_Redis(redis_conn);
const weather_service = new OpenWeatherMap(config.open_weather_map,redis_conn)

router.route('/login')
    //check if user is logged in
    .get((req, res, next) => {
        if (req.session.hasOwnProperty("username"))
            res.send({"username": req.session.username})
        else
            res.status(401).send({'error': 'Not logged in'})
    })
    //User "Posts" a new login attempt
    .post((req, res, next) => {
        if (req.body.hasOwnProperty("username"))
            new User(user_service, req.body.username).get()
                .then((username) => {
                    req.session.username = req.body.username
                    res.send({username: req.body.username})
                })
                .catch(err => res.status(401).send({"error": err.message}))
        else if (req.session.hasOwnProperty("username"))
                res.send(req.session.username)
        else
            res.status(400).send({'error': `"username" property missing from request body.`})
    })
    //User logout
    .delete((req, res, next) => {
        req.session.destroy()
        res.send({'Success': 'Successfully Logged out.'})
    })

router.route('/locations')
    //Add new location to user's list of locations
    .post((req, res, next) => {
        //Is new location valid with weather service?
        new Weather(weather_service, [req.body.location]).get()
            .then(weather => {
                //Then add it to user's list of locations
                return new User(user_service, req.session.username).add_location(req.body.location)
            })
            .then(() => res.send(req.body))
            .catch(err => {
                if (err.hasOwnProperty('cod'))
                    res.status(err.cod, err.message).send(err)
                else              
                    next(err)
            })
    })
    //Get list of locations for user (unused)
    .get((req, res, next) => {
        new User(user_service, req.session.username).get_locations()
            .then(locations => res.send(locations))
            .catch(err => next(err))
    })

router.route('/weather')
    //Get weather (uses user from current session)
    .get((req,res,next) => {
        new User(user_service, req.session.username).get_locations()
            .then((locations) => {
                return new Weather(weather_service,locations).get()
            })
            .then(weather => {
                res.send(weather)
            })
            .catch(err => next(err))
    })

//Handle nonexistent routes and nonexistent methods on routes
router.use((req, res, next) => {
    const matching_route = router.stack.filter(layer => layer.route)
        .map(routes => {return {'path': routes.route.path, 'methods': routes.route.methods}})
        .filter(route => route.path === req.path)[0]

        if (matching_route && !(req.method in matching_route.methods))
            res.status(405).send({'error': 'Method ' + req.method + ' not allowed on ' + req.path})
        else if (!matching_route)
            res.status(404).send()
        else
            next()
})

//Handle session expired and unknown errors
router.use((err, req, res, next) => {
    console.log(err)
    if (!req.session.hasOwnProperty('username'))
        res.status(401).send({'error': 'Session has expired'})
    else
        res.status(500).send({'error': err.toString()})
})

export {router}
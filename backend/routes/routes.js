import express from 'express'
import config from 'app/config.json'
import User from 'app/models/user'
import RedisConnector from 'app/connectors/redis-connector'
import UserService_Redis from 'app/services/user-service'

let router = express.Router();

const redis_conn = new RedisConnector(config.redis)
const user_service = new UserService_Redis(redis_conn);

const USERNAME = 'USERNAME'

//User "Posts" a new login attempt
router.route('/login')
    .get((req, res, next) => {
        if (req.session.hasOwnProperty("username"))
            res.send({"username": req.session.username})
        else
            res.status(401).send({'error': 'Not logged in'})
    })
    .post((req, res, next) => {
        //TODO: forward error to generic error handler, only set status here, and only set to 401 if USERNAME wasn't found
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

//TODO: replace with user gotten from session
router.route('/locations')
    .post((req, res, next) => {
        new User(user_service, req.session.USERNAME).add_location(req.body.location)
            .then(locations => res.send(locations))
            .catch(err => next(err))
    })
    .get((req, res, next) => {
        new User(user_service, req.session.USERNAME).get_locations()
            .then(locations => res.send(locations))
            .catch(err => next(err))
    })

router.use((req, res, next) => {
    const matching_route = router.stack.filter(layer => layer.route)
        .map(routes => {return {'path': routes.route.path, 'methods': routes.route.methods}})
        .filter(route => route.path === req.path)[0]

        if (matching_route && !(req.method in matching_route.methods))
            res.status(405).send({'error': 'Method ' + req.method + ' not allowed on ' + req.path})
        if (!matching_route)
            res.status(404).send()
        next()
})

router.use((err, req, res, next) => {
    console.log(err)
    if (!req.session.hasOwnProperty(USERNAME))
        res.status(401).send({'error': 'Session has expired'})
    else
        res.status(500).send({'error': err.toString()})
})

export {router}
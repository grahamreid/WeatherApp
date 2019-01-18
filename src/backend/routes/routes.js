import express from 'express'
import User from 'app/models/user'

let router = express.Router();

//Integration Test: when username not provided
//Integration Test: when content-type is not application/json
router.route('/users')
    .post((req, res, next) => {
        //TODO: Controller for handling username input sanitizing and field existance
        if (req.body.hasOwnProperty('username'))
            new User(req.body.username).save()
                .then(username => res.send(username))
                .catch(err => next(err))
        else
            res.status(400).send('"username" property missing from request body.')
    })   

//User "Posts" a new login attempt
router.route('/login')
    .post((req, res, next) => {
        //TODO: forward error to generic error handler, only set status here, and only set to 401 if username wasn't found
        if (req.body.hasOwnProperty('username'))
            new User(req.body.username).get()
                .then(username => res.send(username))
                .catch(err => res.status(401).send({"error": err.message}))
        else
            res.status(400).send('"username" property missing from request body.')
    }) 

//TODO: replace with user gotten from session
router.route('/locations')
    .post((req, res, next) => {
        new User(req.body.username).add_location(req.body.location)
            .then(locations => res.send(locations))
            .catch(err => next(err))
    })
    .get((req, res, next) => {
        new User(req.body.username).get_locations()
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
});

router.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send({'error': err.toString()})
})

export {router}
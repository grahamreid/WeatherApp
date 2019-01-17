import express from 'express'
import User from 'app/models/user'

let router = express.Router();

router.route('/users/:username')
    .get((req, res, next) => {
        try {
            //TODO: Some kind of sanitation of username, either in model or separate controller
            res.send(new User(req.params.username).get())
        }
        catch (err) {
            next(err)
        }
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
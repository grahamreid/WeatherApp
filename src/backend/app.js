import {router} from './routes/routes'
import bodyParser from 'body-parser'
import argv from 'yargs'
import express from 'express'
import session from 'express-session'
import config from 'app/config.json'
import morgan from 'morgan'

var RedisStore = require('connect-redis')(session);

const app = express()
// const RedisStoreSession = RedisStore(session)

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.use(morgan('tiny'))

app.use(session({
    store: new RedisStore(config.redis),
    secret: config.session.secret,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}))

app.use('/api', router)

app.use((req, res, next) => {
    res.status(404).send()
})

const port = argv.port || config.port

app.listen(port, () => {
    return console.log('Weather app server listening on port ' + port)
})
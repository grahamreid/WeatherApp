import {router} from './routes/routes'
import bodyParser from 'body-parser'
import argv from 'yargs'
import express from 'express'
import config from 'app/config.json'
import morgan from 'morgan'

const app = express()

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.use(morgan('tiny'))

app.use('/api', router)

app.use((req, res, next) => {
    res.status(404).send()
})

const port = argv.port || config.port

app.listen(port, () => {
    return console.log('Weather app server listening on port ' + port)
})
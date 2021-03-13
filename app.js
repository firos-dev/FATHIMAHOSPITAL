const path = require('path')
const express = require('express')
const hbs = require('hbs')
require('./db/mongoose')
const dashBoardRouter = require('./routers/dashboard/dashboard')
const router = require('./routers/router')
const imageRouter = require('./routers/dashboard/imageChange')
const notFount = require('./routers/404')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
    secret: 'fathimadandssecret',
    resave: false,
    saveUninitialized: true
}))

app.use(dashBoardRouter)
app.use(router)
app.use(imageRouter)

app.use(notFount) // 404 Not found

module.exports = app
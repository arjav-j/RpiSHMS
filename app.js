// Packages and files

const express = require('express')
const session = require('express-session')
const path = require('path')
const cookieParser = require('cookie-parser')
//const ejs = require('ejs')


// Middle Ware

const app = express()                               // start express framework

const publicdir = path.join(__dirname, './public')  // set up a public folder for data like css etc
app.use(express.static(publicdir))
app.use(cookieParser())
app.use(express.urlencoded({extended: false }))     // parse URL-encoded bodies (HTML forms etc)
app.use(express.json())                             // parse JSON bodies (APIs etc)
app.set('view engine', 'ejs')


// Set up a Session

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }    
}))


// Defie Routes

app.use('/', require('./routes/pages'))         // TO DO : Build Dynamic front end using Vue.js and bootstrap 
app.use('/auth', require('./routes/auth'))
app.use('/rpi', require('./routes/rpi_api'))    // TO DO : Design and build suitable relational database

app.listen(3000, (err) => {
    if(err) { console.log(err); }
    else { console.log('listening on port: 3000') }
})
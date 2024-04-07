const express = require('express')
const app = express()
const dotenv = require('dotenv')
const session = require('express-session')
const passport = require('passport')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const bodyParser = require('body-parser') 
const cors = require("cors");
require('./models/User')

dotenv.config()
app.use(cors());
mongoose.connect(process.env.DB_CONNECT_STRING)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

app.use(session({
    secret: process.env.COOKIEKEY,
    store: MongoStore.create({mongoUrl: process.env.DB_CONNECT_STRING}),
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24, httpOnly: true} // session is valid for One day
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(passport.authenticate('session'));

require('./router/auth')(app)
// const userRoute = require('./router/auth')
// app.use('/api/users', userRoute)

if (process.env.NODE_ENV === 'production') {
    // Express serve up production assets
    app.use(express.static('client/dist'))
    const path = require('path')
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    })
}

app.listen(process.env.PORT || 5001, () => {
    console.log('server runs on', process.env.PORT || 5001)
})

module.exports = app
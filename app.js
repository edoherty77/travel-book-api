const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const routes = require('./routes')
const cors = require('cors')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('passport')
require('./passport/googleStrategy')

const app = express()

const Trip = require('./models/trip')

// parse requests of content-type: application/json
app.use(bodyParser.json())

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

//middleware - session config
app.use(
  session({
    store: new MongoStore({ url: process.env.MONGODB_URI }),
    secret: 'duuuude',
    resave: false, // will not resave sessions
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
)

//middleware - passport config
app.use(passport.initialize())
app.use(passport.session())

// routes
app.use('/api/v1/trips', routes.trips)
app.use('/api/v1/users', routes.users)
app.use('/api/v1/memories', routes.memories)
app.use('/api/v1/auth', routes.auth)

app.listen(process.env.PORT, () => {
  console.log(`Api is running on port ${process.env.PORT}`)
})

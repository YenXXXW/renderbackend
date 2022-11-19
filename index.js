require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const cors = require('cors')

// express app
const app = express()

const corsOptions ={
  origin: [
    'http://localhost:3000',
    'https://renderfrontend.onrender.com' ,
    'https://renderfrontend.vercel.app/'
  ] ,
  Credential : true
}

app.use(cors(corsOptions))

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

app.get('/' , res.send('hello'))
// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })

  module.exports = app;
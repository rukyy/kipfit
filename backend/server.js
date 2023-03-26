require('dotenv').config()
let cors = require("cors")
const express = require('express')
const workoutRoutes = require('./routes/routes')
const mongoose = require("mongoose")

// express app
const app = express()

// middleware
app.use(express.json())
app.use(cors())

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

// route handler
app.use('/api/workouts',workoutRoutes)

// connect to the data base
mongoose.connect(process.env.URI)
    .then(()=>{
        app.listen(process.env.PORT, ()=>{console.log('listening on port 5000')})
    })
    .catch((error)=>{
        console.log(error)
    })
// listen for request


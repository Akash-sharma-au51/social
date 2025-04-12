require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const port = process.env.PORT
const connecttodb = require("./db.config")

const app = express()

const corsOption = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}

//middlewares
app.use(express.json())
app.use(cors(corsOption))
app.use(cookieParser())

// Database connection
connecttodb()
    .then(() => {
        app.listen(port, () => {
            console.log('app is running on port', port)
        })
    })
    .catch((error) => {
        console.error("Error occurred in running server:", error)
    })


    



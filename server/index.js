require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const port = process.env.PORT
const connecttodb = require("./db.config")


const app = express()

const corsOption = {
    target:'*',
    method: ["GET,POST,PUT,DELETE"]  
}

//middlewares
app.use(express.json())
app.use(cors(corsOption))



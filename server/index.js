require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 5000 
const connecttodb = require("./db.config")
const userRoutes = require("./Routes/userRoutes")
const postRoutes = require('./Routes/postRoutes')

const app = express()

const corsOption = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}

// Middlewares
app.use(express.json())
app.use(cors(corsOption))
app.use(cookieParser())

// Routes
app.use("/api/users", userRoutes) 
app.use("/api/posts", postRoutes) 

// Root route
app.get("/", (req, res) => {
    res.json({ message: "App is running" })
})

// Database connection
connecttodb()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`) 
        })
    })
    .catch((error) => {
        console.error("Failed to connect to database:", error) 
        process.exit(1) 
    })

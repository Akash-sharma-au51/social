require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 5000 // Added default port
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
app.use(cors(corsOptions))
app.use(cookieParser())
app.use("/api/users", userRoutes) // Fixed spacing
app.use("/api/posts", postRoutes) // Fixed spacing

// Database connection
connecttodb()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`) // Improved log message
        })
    })
    .catch((error) => {
        console.error("Failed to connect to database:", error) // More specific error message
        process.exit(1) // Exit process on database connection failure
    })

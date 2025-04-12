require('dotenv').config()
const mongoose = require('mongoose')

const uri = process.env.MongoUri

const connecttodb = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connected to MongoDB successfully')
    } catch (error) {
        console.error("Error occurred while connecting to MongoDB:", error)
        throw error // Re-throw the error to handle it in the main application
    }
}

module.exports = connecttodb

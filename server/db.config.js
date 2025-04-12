require('dotenv').config()
const mongoose = require('mongoose')

const uri = process.env.MongoUri

const connecttodb = async () => {
    try {
        await mongoose.connect(uri.{
            useNewUrlParser:true,
        })
        
    } catch (error) {
        console.error("error occured",error);
        
        
    }
    
}
module.exports = connecttodb

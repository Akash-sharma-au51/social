const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password:{
        type:String,
        required:true,
    },
    profilepic:{
        type:String,
        default: 'https://res.cloudinary.com/demo/image/upload/v1674042687/default_profile_pic.png'
    }
});

module.exports = mongoose.model('User', userSchema);
const mongoose =require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema( {
    name : {
    type: String,
   
    trim:true
    },
   
    email: {
        type: String,
        required : true,
        unique: true,
        trim : true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password:{
        type: String, 
        required : true,
        trim: true
    },
    address : {
        street: {
            type:String
        },
        city: {
            type:String
        },
        state: {
            type: String
        },
        pin:{
            type:String
        }
    },
    status : {
        type:String,
        trim : true
     }
     ,
     tokens: [{
        token: {
             type: String,
            required: true
         }
     }]
})

userSchema.methods.generateAuthToken = async function () {
     const user = this
     const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, config.JWT_SECRET, {
        expiresIn: '48h'
      })

     user.tokens = user.tokens.concat({ token })
    await user.save()

     return token
 }
const User = mongoose.model('user' ,userSchema)
module.exports =User


const mongoose =require('mongoose')
const validator = require('validator')

const Product = mongoose.model('product' , {
    product_name:{
        type:String,
        required:true
    },
    product_category: {
        type:String,
    },
    product_price: {
        type: Number,
        required:true
    },
    product_quantity:{
        type:Number
    },
    instock:{
        type:Boolean
    },
    avatar : {
        type:Buffer
    }
    
})
module.exports= Product


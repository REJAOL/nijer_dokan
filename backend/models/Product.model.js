const mongoose= require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    brand:{
        type:String,
        required:true 
    },
    price:{
        type:Number,
        required:true
    },
    color:{
        type:String,
        required:true 
    },
    quantity:{
        type:Number,
        required:true 
    },
    image:{
        type:String,
        required:true 
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Product', productSchema)
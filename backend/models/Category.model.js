const  mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    title:{
        type:String,
    },
    description:{
        type:String
    }
},{
    timestamps:true
})


module.exports = mongoose.model("Category",categorySchema )

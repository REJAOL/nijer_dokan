const  mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    title:{
        type:String,
    },
    description:{
        type:String
    }
})


module.exports = mongoose.model("Category",categorySchema )

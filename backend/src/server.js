require('dotenv').config();
const app = require('./app.js')

const mongoose = require('mongoose')


const DB = process.env.MONGODB_URI
const PORT = process.env.PORT || 5000

const dbConnection  = async()=>{
    try {
        await mongoose.connect(DB)
        console.log('mongodb is  connected');
    } catch (error) {
        console.log("mongodb is not connected", error)
        process.exit(1)
    }
}
dbConnection()

app.listen(PORT,()=>{
    console.log(`app is running on port: ${PORT}`);
})


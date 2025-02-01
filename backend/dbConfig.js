require("dotenv").config()
const mongoose = require('mongoose')

const connect = async()=>{
    try {
        const connection = await mongoose.connect(process.env.DB_URL)
        console.log("Db Connected");
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = connect
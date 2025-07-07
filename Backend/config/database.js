const mongoose=require("mongoose");

require("dotenv").config();
const connect= async ()=>{

    
    mongoose.connect(process.env.MONGO_DB_URL)

}

module.exports={connect};
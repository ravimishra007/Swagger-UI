const mongoose  = require('mongoose')
require("dotenv").config()

async function connectionToDb(){
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to the DB")

    } catch (error) {
        console.error(error);
        return response.status(401).send({error:true,msg:"unable to connect"})
    }
}

module.exports = {
    connectionToDb
}
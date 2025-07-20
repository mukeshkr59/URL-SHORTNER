const mongoose = require("mongoose")

async function connectToMongoDB(url){
    return mongoose.connect(url || process.env.MONGODB_URI)
}

module.exports = {
    connectToMongoDB
}
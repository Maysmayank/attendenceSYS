const mongoose = require("mongoose");

async function ConnectMongo(url) {
    try {
        await mongoose.connect(url);
        console.log("DB CONNECTED!!");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
    }
}

module.exports = ConnectMongo;

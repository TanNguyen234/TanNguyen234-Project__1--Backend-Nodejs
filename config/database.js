//File check kết nối

const mongoose = require("mongoose");

module.exports.connect = async () =>  {
    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB! Successfully");
    } catch (err) {
        console.error("Failed to connect to MongoDB");
    }
}
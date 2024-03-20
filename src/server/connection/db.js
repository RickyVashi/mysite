const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017"

const connectToMongo = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/Routine", {
    }).then(() => {
        console.log("Connection Done");
    }).catch((e) => {
        console.log("No Connection");
    });
}

module.exports = connectToMongo;
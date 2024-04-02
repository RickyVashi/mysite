require('dotenv').config();

const mongoose = require('mongoose');

//mongodb+srv://RickyVashi:<password>@mywebsite.35womig.mongodb.net/

const connectToMongo = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/Routine", {
    }).then(() => {
        console.log("Connection Done");
    }).catch((e) => {
        console.log(e);
        console.log("No Connection");
    });
}

module.exports = connectToMongo;
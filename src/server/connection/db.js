require('dotenv').config();

const mongoose = require('mongoose');
const mongoURI = process.env.URL
//mongodb+srv://RickyVashi:<password>@mywebsite.35womig.mongodb.net/

const connectToMongo = () => {
    mongoose.connect(mongoURI, {
    }).then(() => {
        console.log("Connection Done");
    }).catch((e) => {
        console.log(e);
        console.log("No Connection");
    });
}

module.exports = connectToMongo;
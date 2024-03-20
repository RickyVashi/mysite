const mongoose = require('mongoose');

const dateSchema = new mongoose.Schema({
  userName:{type:String, required : true},
  date: {
    type: String,
    required: true,
    unique: true,
  },
  present: {
    type: Boolean,
    required: true,
  },
  // Add more fields as needed
});

const DateModel = mongoose.model('DateModel', dateSchema);

module.exports = DateModel;

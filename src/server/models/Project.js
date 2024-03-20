const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  userName:{type:String, required : true},
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  from_date: { type: Date, required: true },
  to_date: { type: Date, required: true }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

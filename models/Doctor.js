const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name :String,
  email:String,
  password:String
},{
    timestamps: true
});

// Create a doctor model
module.exports = mongoose.model('Doctor', doctorSchema);

const mongoose = require('mongoose');


const paymentSchema = new mongoose.Schema({
    user: String,
    currentBalance: Number,
  });
  
  const Payment = mongoose.model('Payment', paymentSchema);

  module.exports = Payment;
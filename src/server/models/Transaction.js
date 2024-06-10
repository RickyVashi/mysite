// transaction.js

const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: String, // or use ObjectId type if referencing users
    transactionType: String,
    transactionId: String,
    amount: Number,
    timestamp: { type: Date, default: Date.now },
  
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;

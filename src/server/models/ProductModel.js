const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  orderID : {type: String},
  email: { type: String },
  id: { type: Number },
  title: { type: String },
  description: { type: String },
  category: { type: String },
  price: { type: Number },
  discountPercentage: { type: Number },
  images: { type: [String] },
  discountedPrice: { type: String },
  quantity: { type: Number },
  time: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

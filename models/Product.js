const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sold: {
    type: Number,
    required: true,
  },
  netPrice: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Product = new mongoose.model("Product", productSchema);
exports.Product = Product;

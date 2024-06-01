const mongoose = require("mongoose");

const prodListSchema = new mongoose.Schema({
  prodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: false,
  },
  quantity: {
    type: Number,
    required: false,
  },
  sellPrice: {
    type: Number,
    required: false,
  },
});

const cartSchema = new mongoose.Schema({
  products: {
    type: [prodListSchema],
    required: false,
  },
  totalPrice: {
    type: Number,
    required: false,
  },
});

const Cart = new mongoose.model("Cart", cartSchema);
exports.Cart = Cart;

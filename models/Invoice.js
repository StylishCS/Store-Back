const mongoose = require("mongoose");

const prodListSchema = new mongoose.Schema({
  prodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const invoiceSchema = new mongoose.Schema(
  {
    products: {
      type: [prodListSchema],
    },
    seller: {
      type: String,
      required: true,
    },
    netPrice: {
      type: Number,
      required: true,
    },
    sellPrice: {
      type: Number,
      required: true,
    },
    profit: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Invoice = new mongoose.model("Invoice", invoiceSchema);
exports.Invoice = Invoice;

const { Cart } = require("../models/Cart");
const { Invoice } = require("../models/Invoice");
const { Product } = require("../models/Product");

async function addToCart(req, res) {
  try {
    let cart = await Cart.findOne();
    if (!cart) {
      cart = new Cart({});
    }
    let prod = await Product.findById(req.params.id);
    cart.products.push({
      prodId: prod._id,
      quantity: req.body.quantity,
      sellPrice: req.body.sellPrice,
    });
    await cart.save();
    cart = await Cart.findById(cart._id).populate("products.prodId");
    let totalPrice = 0;
    cart.products.forEach((item) => {
      totalPrice += item.quantity * item.sellPrice;
    });
    cart.totalPrice = totalPrice;
    await cart.save();
    return res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function getCartItems(req, res) {
  try {
    let cart = await Cart.find().populate("products.prodId");
    return res.status(200).json(cart[0]);
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function removeFromCart(req, res) {
  try {
    const { productId } = req.params;
    let cart = await Cart.findOneAndUpdate(
      {},
      { $pull: { products: { prodId: productId } } },
      { new: true }
    ).populate("products.prodId");

    let totalPrice = 0;
    cart.products.forEach((item) => {
      totalPrice += item.quantity * item.sellPrice;
    });
    cart.totalPrice = totalPrice;
    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function checkoutCart(req, res) {
  try {
    const cart = await Cart.findOne().populate("products.prodId");
    let sellPrice = cart.totalPrice;
    let netPrice = 0;
    cart.products.map(async (item) => {
      netPrice += item.prodId.netPrice * item.quantity;
      await Product.findByIdAndUpdate(item.prodId._id, {
        $inc: { sold: item.quantity },
      });
    });
    let profit = sellPrice - netPrice;

    const invoice = new Invoice({
      products: cart.products,
      seller: req.body.seller,
      netPrice: netPrice,
      sellPrice: sellPrice,
      profit: profit,
    });
    await invoice.save();
    await Cart.findByIdAndDelete(cart._id);
    return res.status(200).json(invoice);
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

module.exports = { addToCart, getCartItems, removeFromCart, checkoutCart };

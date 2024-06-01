const { Product } = require("../models/Product");

async function addProduct(req, res) {
  try {
    req.body.image = req.cloudinaryResult.secure_url;
    const prod = new Product({
      name: req.body.name,
      sold: 0,
      netPrice: req.body.netPrice,
      image: req.body.image,
    });
    await prod.save();
    return res.status(201).json(prod);
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}
async function getProducts(req, res) {
  try {
    const products = await Product.find();
    if (!products[0]) {
      return res.status(404).json("No Products Found");
    }
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json("No Product Found");
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

module.exports = { addProduct, getProducts, getProductById };

var express = require("express");
const {
  addToCart,
  getCartItems,
  removeFromCart,
  checkoutCart,
} = require("../controllers/cartController");
var router = express.Router();

router.post("/checkout", checkoutCart);
router.post("/:id", addToCart);
router.get("/", getCartItems);
router.delete("/:productId", removeFromCart);

module.exports = router;

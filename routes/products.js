var express = require("express");
const {
  addProduct,
  getProducts,
  getProductById,
} = require("../controllers/productsController");
const uploadToCloudinary = require("../middlewares/uploadToCloudinary");
var router = express.Router();
const multer = require("multer");
const fileUpload = multer();

router.post("/add", fileUpload.single("image"), uploadToCloudinary, addProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);

module.exports = router;

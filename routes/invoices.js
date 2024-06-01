var express = require("express");
const {
  getInvoices,
  getInvoiceById,
} = require("../controllers/invoicesController");
var router = express.Router();

router.get("/", getInvoices);
router.get("/:id", getInvoiceById);

module.exports = router;

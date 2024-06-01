const { Invoice } = require("../models/Invoice");

async function getInvoices(res, res) {
  try {
    const invoices = await Invoice.find().populate("products.prodId");
    if (!invoices[0]) {
      return res.status(404).json("No Invoices Found");
    }
    return res.status(200).json(invoices);
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function getInvoiceById(req, res) {
  try {
    const invoice = await Invoice.findById(req.params.id).populate(
      "products.prodId"
    );
    if (!invoice) {
      return res.status(404).json("No Invoice Found");
    }
    return res.status(200).json(invoice);
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

module.exports = { getInvoices, getInvoiceById };

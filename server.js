const products = require("./data/products");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

// @desc Get all products
// @route GET /api/products
app.get("/api/products", (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(products));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

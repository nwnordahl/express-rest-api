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

// @desc Get a single product
// @route GET /api/products/:id
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);

  if (!product) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Product not found" }));
  } else {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(product));
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

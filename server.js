const products = require("./data/products");
const uuid = require("uuid");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

// Middleware parser for request body
app.use(express.json());

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

// @desc Create a product
// @route POST /api/products
app.post("/api/products", (req, res) => {
  const product = {
    id: uuid.v4(),
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  };
  products.push(product);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(product));
});

// @desc Update a product
// @route PUT /api/products/:id
app.put("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);

  if (!product) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Product not found" }));
  } else {
    const index = products.findIndex((p) => p.id === req.params.id);
    const newProduct = {
      id: product.id,
      name: req.body.name || product.name,
      description: req.body.description || product.description,
      price: req.body.price || product.price,
    };

    products[index] = newProduct;

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newProduct));
  }
});

// @desc Delete a product
// @route DELETE /api/products/:id
app.delete("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);

  if (!product) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Product not found" }));
  } else {
    products.splice(
      products.findIndex((p) => p.id === req.params.id),
      1
    );

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ message: `Product with id ${req.params.id} deleted` })
    );
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

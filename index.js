const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const port = 3000;

// Initial Cart Data
let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 }
];

// Function to add an item to the cart
function addNewItem(productId, name, price, quantity) {
  productId = parseInt(productId);
  price = parseFloat(price);
  quantity = parseInt(quantity);

  let existingItem = cart.find(item => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += quantity; // Update quantity if item exists
  } else {
    cart.push({ productId, name, price, quantity });
  }
  return cart;
}

// Endpoint 1: Add an item to the cart
app.get('/cart/add', (req, res) => {
  const { productId, name, price, quantity } = req.query;

  if (!productId || !name || !price || !quantity) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  let updatedCart = addNewItem(productId, name, price, quantity);
  res.json({ cartItems: updatedCart });
});

// Function to edit quantity of an item
function editQuantity(productId, quantity) {
  productId = parseInt(productId);
  quantity = parseInt(quantity);

  cart = cart.map(item =>
    item.productId === productId ? { ...item, quantity } : item
  );
  return cart;
}

// Endpoint 2: Edit quantity of an item in the cart
app.get('/cart/edit', (req, res) => {
  const { productId, quantity } = req.query;

  if (!productId || !quantity) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  let updatedCart = editQuantity(productId, quantity);
  res.json({ cartItems: updatedCart });
});

// Function to delete an item from the cart
function deleteItemFromCart(productId) {
  productId = parseInt(productId);
  cart = cart.filter(item => item.productId !== productId);
  return cart;
}

// Endpoint 3: Delete an item from the cart
app.get('/cart/delete', (req, res) => {
  const { productId } = req.query;

  if (!productId) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  let updatedCart = deleteItemFromCart(productId);
  res.json({ cartItems: updatedCart });
});

// Endpoint 4: Read all items in the cart
app.get('/cart', (req, res) => {
  res.json({ cartItems: cart });
});

// Function to calculate total quantity
function totalQuantity() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

// Endpoint 5: Calculate total quantity of items
app.get('/cart/total-quantity', (req, res) => {
  res.json({ totalQuantity: totalQuantity() });
});

// Function to calculate total price
function totalPrice() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Endpoint 6: Calculate total price of items
app.get('/cart/total-price', (req, res) => {
  res.json({ totalPrice: totalPrice() });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

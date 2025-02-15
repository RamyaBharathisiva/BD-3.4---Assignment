const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express(); // Define app before using it
app.use(cors());

const port = 3000;

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 }
];

// function to Add an Item to the Cart
function addNewItem(productId,name,price,quantity){
  let cartItem = {
    productId: productId,
    name: name,
    price: price,
    quantity: quantity
  };
  cart.push(cartItem);
  return cart;
}
// Endpoint 1:Add an Item to the Cart
app.get('/cart/add',(req,res)=>{
  let productId=parseInt(req.query.productId);
  let name=req.query.name;
  let price=parseFloat(req.query.price);
  let quantity=req.query.quantity;
  let result=addNewItem(productId,name,price,quantity,cart);
  res.json({cartItem:result});
})

// function to  Edit Quantity of an Item in the Cart
function editQuantity(ele,productId,quantity){
  if(ele.productId===productId){
    ele.quantity=quantity;
  }
  return ele;
}
// Endpoint 2:Edit Quantity of an Item in the Cart
app.get('/cart/edit',(req,res)=>{
  let productId=parseInt(req.query.productId);
  let quantity=parseInt(req.query.quantity);
  let result=cart.filter(ele=>editQuantity(ele,productId,quantity));
  res.json(result);
})

// function to Delete an Item from the Cart
function deleteItemFromCart(productId){
  cart = cart.filter(item => item.productId !== productId); // Remove item
  return cart;
}
// Endpoint 3:Delete an Item from the Cart
app.get('/cart/delete',(req,res)=>{
  let productId=parseInt(req.query.productId);
  cart = deleteItemFromCart(productId);
  res.json({cartItems:cart});
})

// Endpoint 4:Read Items in the Cart
app.get('/cart',(req,res)=>{
  res.json({cartitems:result});
})

// function to Calculate Total Quantity of Items in the Cart
function totalQuantity(cart){
  let total=0;
  for(let i=0;i<cart.length;i++){
    total=cart[i].quantity+total;
  }
  return total;
}
// Endpoint 5:Calculate Total Quantity of Items in the Cart
app.get('/cart/total-quantity',(req,res)=>{
  let total=totalQuantity(cart);
  res.json({totalQuantity:total});
})

// function to Calculate Total Price of Items in the Cart
function totalPrice(cart){
  let total=0;
  for(let i=0;i<cart.length;i++){
    total+=cart[i].price*cart[i].quantity;
  }
  return total;
}
// Endpoint 6:Calculate Total Price of Items in the Cart
app.get('/cart/total-price',(req,res)=>{
  let total=totalPrice(cart);
  res.json({totalprice:total});
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

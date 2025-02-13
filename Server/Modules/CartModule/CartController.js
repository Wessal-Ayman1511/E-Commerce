import express from "express";
import Cart from "../../db/models/cart.model.js"
import Product from "../../db/models/product.model.js";
import asyncHandler from "../../src/middlewares/asyncHandler.js";
import mongoose from "mongoose";

const addToCart = asyncHandler(async (req, res, next) => {
  const { productId, quantity } = req.body;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: "Invalid product ID format" });
  }

    const userId = req.user._id
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized: User ID is missing" });
      }
      

    let cart = await Cart.findOne({ user: userId });

    if (!cart) 
      cart = new Cart({ user: userId, items: [] });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    try {
        await cart.save();
        console.log("Cart saved successfully:", cart);
      } catch (error) {
        console.error("Error saving cart:", error);
      }
          res.json({ message: "Product added to cart", cart });
  } 
);



const viewCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized: User ID is missing" });
      }
    
    let cart = await Cart.findOne({ user: userId }).populate("items.product", "name price description");

    if (!cart) {
        return res.status(404).json({ message: "Cart is empty" });
    }

    res.json({ cart });
});


const updateProductQuantity = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    if (!userId) 
        return res.status(401).json({ error: "Unauthorized: User ID is missing" });
    

    const { productId, quantity } = req.body;

    if (!mongoose.isValidObjectId(productId)) {
        return res.status(400).json({ message: "Invalid productId format" });
    }

    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ message: "No product found in our store" });
    }

    
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        return res.status(404).json({ message: "No cart associated with that user" });
    }

    const index = cart.items.findIndex((item) => item.product.toString() === productId);
    if (index > -1) {
        cart.items[index].quantity = quantity;
    } else {
        return res.status(404).json({ message: "Product not found in user cart" });
    }

    await cart.save();
    res.json({ message: "Product quantity updated successfully", cart });
});

const deleteProductFromCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    if (!userId) 
        return res.status(401).json({ error: "Unauthorized: User ID is missing" });

    const {productId} = req.body
    if (!mongoose.isValidObjectId(productId)) {
        return res.status(400).json({ message: "Invalid productId format" });
    }

    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ message: "No product found in our store" });
    }

    const cart = await Cart.findOne({ user: userId });
    
    if (!cart || cart.items.length === 0) {
        return res.status(404).json({ message: "Your cart is empty, nothing to delete" });
    }
    
    let isFounded = cart.items.findIndex((item)=> item.product.toString()===productId)
    if(isFounded === -1)  
        return res.status(404).json({message: "item not added to cart or already removed"})


    cart.items = cart.items.filter((item)=>item.product.toString() != productId)
    
    await cart.save();
    res.json({ message: "Product removed from cart", cart });

}
)

const clearCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    if (!userId) 
        return res.status(401).json({ error: "Unauthorized: User ID is missing" });

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
        return res.status(404).json({ message: "No cart found to be cleared!" });
    }
    
    if(cart.items.length === 0)
        return res.json({message: "Your cart already cleared"})

    cart.items = [];
    await cart.save();

    res.json({ message: "Cart cleared successfully", cart });
});


export { addToCart, updateProductQuantity, deleteProductFromCart, clearCart, viewCart };

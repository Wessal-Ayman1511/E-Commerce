import Wishlist from "../../db/models/wishlist.model.js";
import Product from "../../db/models/product.model.js";
import mongoose from "mongoose";

import asyncHandler from "../../src/middlewares/asyncHandler.js";

const addProductToWishlist = asyncHandler(async (req, res) => {
    try {
        const { productId } = req.body;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        const userId = req.user._id;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized: User ID is missing" });
        }

        // Check if the product exists
        const founded_product = await Product.findById(productId);
        if (!founded_product) {
            return res.status(404).json({ message: "Product not found in our store" });
        }

        // Find the wishlist for the user
        let wishlist = await Wishlist.findOne({ user: userId });

        // If the wishlist does not exist, create a new one
        if (!wishlist) {
            wishlist = new Wishlist({ user: userId, products: [] });
        }

        // Ensure wishlist.products exists before calling findIndex()
        const itemIndex = wishlist.products?.findIndex((item) => item.toString() === productId);

        if (itemIndex > -1) {
            return res.json({ message: "Item already in your wishlist" });
        }

        // Push productId directly (not as an object)
        wishlist.products.push(productId);

        // Save the updated wishlist
        await wishlist.save();

        return res.json({ message: "Product added to wishlist" });

    } catch (error) {
        console.error("Error adding product to wishlist:", error);
        return res.status(500).json({ message: "An error occurred while saving wishlist contents" });
    }
});


const viewWishlist = asyncHandler(async (req, res) => {

        const userId = req.user._id;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized: User ID is missing" });
        }

        // Find the user's wishlist and populate product details
        const wishlist = await Wishlist.findOne({ user: userId }).populate("products");

        if (!wishlist) {
            return res.json({ message: "Your wishlist is empty", products: [] });
        }

        return res.json({ message: "Wishlist retrieved successfully", wishlist });
    });


    const deleteFromWishlist = asyncHandler(async (req, res) => {
        const { productId } = req.body;
    
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }
    
        const userId = req.user._id;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized: User ID is missing" });
        }
    
        // Find the user's wishlist
        const wishlist = await Wishlist.findOne({ user: userId });
    
        if (!wishlist || wishlist.products.length === 0) {
            return res.status(404).json({ message: "Your wishlist is empty, nothing to delete" });
        }
    
        // Check if the product exists in the wishlist
        const itemIndex = wishlist.products.findIndex((item) => item.toString() === productId);
    
        if (itemIndex === -1) {
            return res.status(404).json({ message: "Item not found in wishlist or already removed" });
        }
    
        // Remove the product from the wishlist
        wishlist.products = wishlist.products.filter((product) => product.toString() !== productId);
    

    await wishlist.save()
    return res.json({message:"item removed from wishlist successfully"})

})


const clearWishlist = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    if (!userId) 
        return res.status(401).json({ error: "Unauthorized: User ID is missing" });
    
    let wishlist= await Wishlist.findOne({ user: userId });
    if (!wishlist) {
        return res.status(404).json({ message: "No wishlist found to be cleared!" });
    }

     
    if(wishlist.products.length === 0)
        return res.json({message: "Your wishlist already cleared"})

    wishlist.products= [];
    await wishlist.save();

    res.json({ message: "wishlist cleared successfully", wishlist });
});


export { addProductToWishlist, viewWishlist, deleteFromWishlist, clearWishlist };

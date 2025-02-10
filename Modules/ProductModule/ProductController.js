import asyncHandler from "../../src/middlewares/asyncHandler.js";
import Product from "../../db/models/product.model.js";



const addProduct = asyncHandler(async (req, res) => {
    try {
      const { name, description, price, category, quantity, brand, image} = req.fields;
  
      // Validation
      switch (true) {
        case !name:
          return res.json({ error: "Name is required" });
        case !brand:
          return res.json({ error: "Brand is required" });
        case !description:
          return res.json({ error: "Description is required" });
        case !price:
          return res.json({ error: "Price is required" });
        case !category:
          return res.json({ error: "Category is required" });
        case !quantity:
          return res.json({ error: "Quantity is required" });
      }
  
      const product = new Product({ ...req.fields });
      await product.save();
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(400).json(error.message);
    }
  });




  export {
    addProduct
  }
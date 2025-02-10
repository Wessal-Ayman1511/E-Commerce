import { Router } from "express";
import { addToCart, deleteProductFromCart, updateProductQuantity } from "../CartModule/CartController.js";
import { authenticated, authorizedAdmin } from "../../src/utilities/authMiddleware.js";
export const cart_routes = Router()

cart_routes.post("/cart/add", authenticated, addToCart)
cart_routes.put("/cart/update", authenticated, updateProductQuantity)
cart_routes.put("/cart/delete", authenticated, deleteProductFromCart)

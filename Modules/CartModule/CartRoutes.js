import { Router } from "express";
import { addToCart, clearCart, deleteProductFromCart, updateProductQuantity, viewCart } from "../CartModule/CartController.js";
import { authenticated, authorizedAdmin } from "../../src/utilities/authMiddleware.js";
export const cart_routes = Router()

cart_routes.post("/cart/add", authenticated, addToCart)
cart_routes.put("/cart/update", authenticated, updateProductQuantity)
cart_routes.delete("/cart/delete", authenticated, deleteProductFromCart)
cart_routes.delete("/cart/clearcart", authenticated, clearCart)
cart_routes.get("/cart/view", authenticated, viewCart)

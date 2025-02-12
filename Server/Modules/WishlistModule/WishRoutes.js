import { Router } from "express"
import { addProductToWishlist, clearWishlist, deleteFromWishlist, viewWishlist } from "./WishController.js";
import { authenticated, authorizedAdmin } from "../../src/utilities/authMiddleware.js";

export const wishlist_routes = Router()

wishlist_routes.post("/wishlist/add", authenticated, addProductToWishlist)
wishlist_routes.get("/wishlist/view", authenticated, viewWishlist)
wishlist_routes.delete("/wishlist/delete", authenticated, deleteFromWishlist )
wishlist_routes.delete("/wishlist/clear", authenticated, clearWishlist)

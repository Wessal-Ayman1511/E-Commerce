import { Router } from "express";
import formidable from "express-formidable";
import { authenticated, authorizedAdmin } from "../../src/utilities/authMiddleware.js";
import checkId from "../../src/middlewares/checkId.js";
import { addProduct, addProductReview, allProductsWithSearchKeyword, deleteProduct, fetchAllProducts, fetchNewProducts, fetchTopProducts, getProductById, updateProduct } from "./ProductController.js";


export const product_routes = Router()


product_routes.route("/product").post(authenticated, authorizedAdmin, formidable(), addProduct)
product_routes.route("/products").get(allProductsWithSearchKeyword)
product_routes.route("/allProducts").get(fetchAllProducts)



product_routes.route("/:id/reviews").post(authenticated, checkId, addProductReview);


product_routes.get("/top", fetchTopProducts);
product_routes.get("/new", fetchNewProducts);


product_routes.route("/product/:id")
.get(getProductById)
.put(authenticated, authorizedAdmin, formidable(), updateProduct)
.delete(authenticated, authorizedAdmin, deleteProduct)
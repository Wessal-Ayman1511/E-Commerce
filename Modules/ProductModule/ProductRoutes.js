import { Router } from "express";
import formidable from "express-formidable";
import { authenticated, authorizedAdmin } from "../../src/utilities/authMiddleware.js";
import checkId from "../../src/middlewares/checkId.js";
import { addProduct } from "./ProductController.js";


export const product_routes = Router()


product_routes.route("/product").post(authenticated, authorizedAdmin, formidable(), addProduct)
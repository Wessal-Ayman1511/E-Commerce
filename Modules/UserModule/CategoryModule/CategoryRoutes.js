import { Router } from "express";
import { authenticated, authorizedAdmin } from "../../../src/utilities/authMiddleware.js";
import { createCategory, updateCategory } from "./CategoryController.js";

const category_routes = Router()

category_routes.route("/category").post(authenticated, authorizedAdmin, createCategory);
category_routes.route("/:categoryId").put(authenticated, authorizedAdmin, updateCategory);


export default category_routes
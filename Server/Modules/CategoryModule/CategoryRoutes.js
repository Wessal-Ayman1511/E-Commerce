import { Router } from "express";

import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "./CategoryController.js";
import { authenticated, authorizedAdmin } from "../../src/utilities/authMiddleware.js";

const category_routes = Router()

category_routes.route("/category").post(authenticated, authorizedAdmin, createCategory);
category_routes.route("/:categoryId").put(authenticated, authorizedAdmin, updateCategory);
category_routes.route("/:categoryId").delete(authenticated, authorizedAdmin, deleteCategory);
category_routes.route("/categories").get(getAllCategories);
category_routes.route("/category/:id").get(getCategoryById);

export default category_routes
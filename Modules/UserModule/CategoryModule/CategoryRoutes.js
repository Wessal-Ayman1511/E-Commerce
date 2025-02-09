import { Router } from "express";
import { authenticated, authorizedAdmin } from "../../../src/utilities/authMiddleware.js";
import { createCategory } from "./CategoryController.js";

const category_routes = Router()

category_routes.route("/categories")
.post(authenticated, authorizedAdmin, createCategory
);

export default category_routes
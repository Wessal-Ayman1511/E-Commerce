import { Router } from "express"
import {authenticated, authorizedAdmin}from "../../src/utilities/authMiddleware.js"
import { createOrder, getAllOrders, getUserOrders } from "./OrderController.js"

export const order_routes = Router()

order_routes.route("/order")
.post(authenticated, createOrder)
.get(authenticated, authorizedAdmin, getAllOrders)


order_routes.route("/myOrders").get(authenticated, getUserOrders);

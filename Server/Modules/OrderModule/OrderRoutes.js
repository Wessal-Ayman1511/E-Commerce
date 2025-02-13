import { Router } from "express"
import {authenticated, authorizedAdmin}from "../../src/utilities/authMiddleware.js"
import { calculateTotalSales, calculateTotalSalesByDate,
    countTotalOrders, createOrder, findOrderById,
    getAllOrders, getUserOrders } from "./OrderController.js"

export const order_routes = Router()

order_routes.route("/order")
.post(authenticated, createOrder)
.get(authenticated, authorizedAdmin, getAllOrders)


order_routes.route("/myOrders").get(authenticated, getUserOrders);
order_routes.route("/total-orders").get(countTotalOrders);
order_routes.route("/total-sales").get(calculateTotalSales);
order_routes.route("/total-sales-by-date").get(calculateTotalSalesByDate);
order_routes.route("/orders/:id").get(authenticated, findOrderById);
//order_routes.route("/:id/pay").put(authenticated, markOrderAsPaid);
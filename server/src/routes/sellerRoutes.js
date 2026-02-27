import express from "express";
import { authenticateToken, requireRole } from "../middleware/authentication.js";
import { OrderDetails, SellersOrders, shipOrder } from "../controllers/sellerController.js";

const router = express.Router()

router.get("/orders", authenticateToken, requireRole("Admin", "Seller"), SellersOrders)
router.get("/orders/:id", authenticateToken, requireRole("Admin", "Seller"), OrderDetails)
router.patch("/orders/:id/ship", authenticateToken, requireRole("Seller", "Admin"), shipOrder)

export default router
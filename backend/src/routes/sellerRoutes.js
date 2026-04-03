import express from "express";
import { authenticateToken, requireRole } from "../middleware/authentication.js";
import { OrderDetails, SellersOrders, shipOrder } from "../controllers/sellerController.js";
import { OrderDetailsValidation, shipOrderValidation } from "../validation/seller.validation.js";
import { validate } from "../middleware/validator.js";

const router = express.Router()

router.get("/orders", authenticateToken, requireRole("Admin", "Seller"), SellersOrders)
router.get("/orders/:id", authenticateToken, requireRole("Admin", "Seller"), OrderDetailsValidation
    , validate, OrderDetails)
router.patch("/orders/:id/ship", authenticateToken, requireRole("Seller", "Admin"), shipOrderValidation, validate,
    shipOrder)

export default router
import express from 'express'
import { checkout, getOrderById, myOrders } from '../controllers/orderController.js'
import { authenticateToken, requireRole } from '../middleware/authentication.js'
import { checkoutValidation, getOrderByIdValidation } from "../validation/order.validation.js";
import { validate } from '../middleware/validator.js';

const router = express.Router()

router.post("/checkout", authenticateToken, checkoutValidation, validate, checkout)
router.get("/:id", authenticateToken, getOrderByIdValidation, validate, getOrderById)
router.get("/", authenticateToken, myOrders)

export default router
import express from 'express'
import { checkout, getOrderById, myOrders } from '../controllers/orderController.js'
import { authenticateToken, requireRole } from '../middleware/authentication.js'

const router = express.Router()

router.post("/checkout", authenticateToken, checkout)
router.get("/:id", authenticateToken, getOrderById)
router.get("/", authenticateToken, myOrders)

export default router
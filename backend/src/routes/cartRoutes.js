import express from 'express'
import { addToCart, getCart, mergeCart, removeFromCart, updateCartQuantity } from '../controllers/cartController.js'
import { authenticateToken } from '../middleware/authentication.js'

const router = express.Router()

router.post("/add", authenticateToken, addToCart)
router.get("/", authenticateToken, getCart)
router.put("/:cartItemId", authenticateToken, updateCartQuantity)
router.delete("/:cartItemId", authenticateToken, removeFromCart)
router.post("/merge-cart", authenticateToken, mergeCart)

export default router

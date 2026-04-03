import express from 'express'
import { addToCart, getCart, mergeCart, removeFromCart, updateCartQuantity } from '../controllers/cartController.js'
import { authenticateToken } from '../middleware/authentication.js'
import { addtoCartValidation, mergeCartValidation, removeCartValidation, updateCartValidation } from "../validation/cart.validation.js";
import { validate } from '../middleware/validator.js';

const router = express.Router()

router.post("/add", authenticateToken, addtoCartValidation, validate, addToCart)
router.get("/", authenticateToken, getCart)
router.put("/:cartItemId", authenticateToken, updateCartValidation, validate, updateCartQuantity)
router.delete("/:cartItemId", authenticateToken, removeCartValidation, validate, removeFromCart)
router.post("/merge-cart", authenticateToken, mergeCartValidation, validate, mergeCart)

export default router

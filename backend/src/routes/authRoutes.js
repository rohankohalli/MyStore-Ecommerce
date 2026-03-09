import express from 'express'
import { confirmPasswordReset, login, logout, refreshAccessToken, register, requestPasswordReset } from '../controllers/authController.js'
import { authenticateToken } from '../middleware/authentication.js'
import { loginLimit } from '../utils/loginLimit.js'

const router = express.Router()

router.post("/register", register)
router.post("/login", loginLimit, login)
router.post("/refresh", refreshAccessToken)
router.post("/logout", authenticateToken, logout)
router.post("/pass-reset-req", requestPasswordReset)
router.post("/pass-reset", confirmPasswordReset)

export default router

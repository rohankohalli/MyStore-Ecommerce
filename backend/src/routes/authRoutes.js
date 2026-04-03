import express from 'express'
import { confirmPasswordReset, login, logout, refreshAccessToken, register, requestPasswordReset } from '../controllers/authController.js'
import { authenticateToken } from '../middleware/authentication.js'
import { loginLimit } from '../utils/loginLimit.js'
import { validate } from "../middleware/validator.js";
import { loginValidation, PasswordResetReqValidation, PasswordResetValidation, registrationValidation } from "../validation/auth.validation.js";

const router = express.Router()

router.post("/register", registrationValidation, validate, register)
router.post("/login", loginLimit, loginValidation, validate, login)
router.post("/refresh", refreshAccessToken)
router.post("/logout", authenticateToken, logout)
router.post("/pass-reset-req", PasswordResetReqValidation, validate, requestPasswordReset)
router.post("/pass-reset", PasswordResetValidation, validate, confirmPasswordReset)

export default router

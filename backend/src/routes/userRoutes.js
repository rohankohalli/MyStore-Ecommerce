import express from "express";
import { changePassword, getUser, updateUser } from "../controllers/userController.js";
import { authenticateToken } from "../middleware/authentication.js";
import { changePasswordValidation, updateUserValidation } from "../validation/user.validation.js";
import { validate } from "../middleware/validator.js";

const router = express.Router()

router.put('/:id', authenticateToken, updateUserValidation, validate, updateUser)
router.get('/my', authenticateToken, getUser)
router.post("/change-password", authenticateToken, changePasswordValidation, validate, changePassword)

export default router

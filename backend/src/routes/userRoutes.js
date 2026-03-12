import express from "express";
import { changePassword, getUser, updateUser } from "../controllers/userController.js";
import { authenticateToken } from "../middleware/authentication.js";

const router = express.Router()

router.put('/:id', authenticateToken, updateUser)
router.get('/my', authenticateToken, getUser)
router.post("/change-password", authenticateToken, changePassword)

export default router

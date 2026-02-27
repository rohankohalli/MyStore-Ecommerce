import express from "express";
import { getUser, updateUser } from "../controllers/userController.js";
import { authenticateToken } from "../middleware/authentication.js";

const router = express.Router()

router.put('/:id', authenticateToken, updateUser)
router.get('/my', authenticateToken, getUser)

export default router

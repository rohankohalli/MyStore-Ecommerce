import express from 'express'
import { authenticateToken, requireRole } from '../middleware/authentication.js';
import { allUsers, changeUserRole, changeUserStatus } from '../controllers/adminController.js';

const router = express.Router()

router.get("/users", authenticateToken, requireRole("Admin"), allUsers);
router.patch("/users/:id/role", authenticateToken, requireRole("Admin"), changeUserRole);
router.patch("/users/:id/status", authenticateToken, requireRole("Admin"), changeUserStatus);

export default router
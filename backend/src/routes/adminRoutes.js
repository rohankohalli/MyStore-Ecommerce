import express from 'express'
import { authenticateToken, requireRole } from '../middleware/authentication.js';
import { allUsers, changeUserRole, changeUserStatus } from '../controllers/adminController.js';
import { changeUserStatusValidation, userRoleChangeValidation } from '../validation/admin.validation.js';
import { validate } from '../middleware/validator.js';

const router = express.Router()

router.get("/users", authenticateToken, requireRole("Admin"), allUsers);
router.patch("/users/:id/role", authenticateToken, requireRole("Admin"), userRoleChangeValidation, validate, changeUserRole);
router.patch("/users/:id/status", authenticateToken, requireRole("Admin"), changeUserStatusValidation, validate, changeUserStatus);

export default router
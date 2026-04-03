import { body, param } from "express-validator";

export const userRoleChangeValidation = [
    param("id").notEmpty().withMessage("User Id is required").isInt().withMessage("Invalid User ID"),
    body("role").notEmpty().withMessage("Role is required")
        .isIn(["User", "Seller", "Admin"]).withMessage("Invalid Role"),
]

export const changeUserStatusValidation = [
    param("id").notEmpty().withMessage("User Id is required").isInt().withMessage("Invalid User ID"),
    body("status").notEmpty().withMessage("Status is required")
]
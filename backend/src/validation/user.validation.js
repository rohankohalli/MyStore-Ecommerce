import { body } from "express-validator";

export const updateUserValidation = [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").trim().isEmail().withMessage("Valid email is required"),
    body("mobileNo").optional().trim().isMobilePhone().withMessage("Valid mobile number is required"),
    body("dateOfBirth").optional().isDate().withMessage("Valid date of birth is required")
]

export const changePasswordValidation = [
    body("changePassword").notEmpty().withMessage("Current Password is required"),
    body("newPassword").notEmpty().withMessage("new Password is required")
]

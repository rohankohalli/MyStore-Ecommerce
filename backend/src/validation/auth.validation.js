import { body } from "express-validator"

export const registrationValidation = [
    body("name").trim().notEmpty().withMessage("Name is Required"),
    body("email").isEmail().withMessage("Invalid Email"),
    body("dateOfBirth").isDate().withMessage("Incorrect Date of Birth"),
    body("mobileNo").trim().notEmpty().isMobilePhone('en-IN').withMessage("Incorrect Mobile Number"),
    body("password").trim().notEmpty().isLength({ min: 8 }).withMessage("Password must be at least 8 charachters")
]

export const loginValidation = [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").trim().notEmpty().withMessage("Password is Required"),
    body("remember").isBoolean().withMessage("Remember must be boolean")
]

export const PasswordResetReqValidation = [
    body("email").isEmail().withMessage("Invalid Email"),
]

export const PasswordResetValidation = [
    body("token").trim().notEmpty().withMessage("Token is missing")
]
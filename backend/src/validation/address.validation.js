import { body, param } from "express-validator";

export const addAddressValidation = [
    body("fullName").trim().notEmpty().withMessage("Full Name is required")
        .isLength({ min: 5 }).withMessage("Full Name must be atleast 5 characters"),

    body("phone").trim().isMobilePhone("en-IN").notEmpty().withMessage("Phone Number is required"),
    body("addressLine").trim().notEmpty().withMessage("Address is required"),
    body("city").trim().notEmpty().withMessage("City is required"),
    body("state").trim().notEmpty().withMessage("State is required"),
    body("country").trim().notEmpty().withMessage("Country Name is required"),
    body("pincode").trim().notEmpty().withMessage("Pincode is required")
        .isPostalCode('IN').withMessage("Invalid Indian pincode"),
]

export const updateAddressValidation = [
    body("fullName").trim().notEmpty().withMessage("Full Name is required")
        .isLength({ min: 5 }).withMessage("Full Name must be atleast 5 characters"),

    body("phone").trim().notEmpty().withMessage("Phone Number is required"),
    body("addressLine").trim().notEmpty().withMessage("Address is required"),
    body("city").trim().notEmpty().withMessage("City is required"),
    body("state").trim().notEmpty().withMessage("State is required"),
    body("country").trim().notEmpty().withMessage("Country Name is required"),
    body("pincode").trim().notEmpty().withMessage("Pincode is required")
        .isPostalCode('IN').withMessage("Invalid Indian pincode"),
]

export const deleteAddressValidation = [
    param("id").isInt().withMessage("Id Not Found")
]

export const setDefaultAddressValidation = [
    param("id").isInt().withMessage("Id Not Found"),
]
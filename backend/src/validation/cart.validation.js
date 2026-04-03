import { body, param } from "express-validator"

export const addtoCartValidation = [
    body("productId").notEmpty().withMessage("Product ID Required").isInt().withMessage("Product ID not valid"),
    body("quantity").notEmpty().withMessage("Quantity Required").isInt({ min: 1 }).
        withMessage("Quantity must be a Positive integer")
]

export const updateCartValidation = [
    body("quantity").notEmpty().withMessage("Quantity Required").isInt({ min: 1 }).
        withMessage("Quantity must be a Positive integer"),
    param("cartItemId").notEmpty().withMessage("Cart Item ID Required").isInt()
        .withMessage("Cart Item ID not valid")
]

export const removeCartValidation = [
    param("cartItemId").notEmpty().withMessage("Cart Item ID Required").isInt()
        .withMessage("Cart Item ID not valid")
]

export const mergeCartValidation = [
    body("items").isArray({ min: 1 }).withMessage("Items must be a non-empty array")
]
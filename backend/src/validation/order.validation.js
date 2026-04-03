import { body, param } from "express-validator"

export const checkoutValidation = [
    body("addressId").notEmpty().withMessage("Address Invalid").isInt().withMessage("Address id not valid"),
    body("paymentMethod").notEmpty().withMessage("Payment method is missing")
        .isIn([("CoD", "UPI", "Card", "Net_Banking")]).withMessage("Invalid payment method")
]

export const getOrderByIdValidation = [
    param("id").notEmpty().withMessage("Order id is required").isInt().withMessage("Order id must be an integer")
]
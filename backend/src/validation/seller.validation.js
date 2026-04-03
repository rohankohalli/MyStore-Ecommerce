import { param } from "express-validator";

export const OrderDetailsValidation = [
    param("id").isInt().withMessage("order id not valid")
]

export const shipOrderValidation = [
    param("id").isInt().withMessage("order id not valid")
]
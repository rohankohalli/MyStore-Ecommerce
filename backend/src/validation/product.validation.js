import { body, param, query } from "express-validator";

export const createProductValidation = [
    body("name").trim().notEmpty().withMessage("Product Name is Empty").isLength({ min: 4 })
        .withMessage("Product Name must be alteast 4 charachters"),
    body("price").trim().notEmpty().withMessage("Price is Empty").isFloat({ gt: 0 }).withMessage("Price must be a positive number"),
    body("stock").trim().notEmpty().withMessage("Stock value is zero").isInt({ gt: 0 })
        .withMessage("Stock Value must be more tha zero"),
    body("category").trim().notEmpty().withMessage("Category is empty")
]

export const updateProductValidation = [
    body("name").trim().notEmpty().withMessage("Product Name is Empty").isLength({ min: 4 })
        .withMessage("Product Name must be alteast 4 charachters"),
    body("description").trim().optional(),
    body("price").trim().notEmpty().withMessage("Price is Empty").isFloat({ gt: 0 })
        .withMessage("Price must be a positive number"),
    body("stock").trim().notEmpty().withMessage("Stock value is zero").isInt({ gt: 0 })
        .withMessage("Stock Value must be more tha zero"),
    body("category").trim().notEmpty().withMessage("Category is empty")
]

export const deleteProductValidation = [
    param("id").isInt().withMessage("Invalid Product ID")
]

export const getallProductsValidation = [
    query("category").optional().isString().withMessage("Category must be a string")
]

export const getProductByIdValidation = [
    param("id").isInt().withMessage("Invalid ProductId")
]
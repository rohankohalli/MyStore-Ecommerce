import express from 'express'
import { createProduct, deleteProduct, getAllProducts, getMyProducts, getProductById, trendingProducts, updateProduct }
    from '../controllers/productController.js'
import { authenticateToken, requireRole } from '../middleware/authentication.js'
import { upload } from '../middleware/upload.js'
import { createProductValidation, deleteProductValidation, getallProductsValidation, getProductByIdValidation, updateProductValidation } from "../validation/product.validation.js";
import { validate } from '../middleware/validator.js';

const router = express.Router()

router.post("/create", authenticateToken, requireRole("Admin", "Seller"), upload.single("image"),
    createProductValidation, validate, createProduct)
router.get('/my-products', authenticateToken, requireRole("Admin", "Seller"), getMyProducts)
router.get('/', getallProductsValidation, validate, getAllProducts)
router.get('/trending', trendingProducts)
router.get('/:id', getProductByIdValidation, validate, getProductById)
router.put('/:id', authenticateToken, requireRole("Admin", "Seller"), upload.single("image"),
    updateProductValidation, updateProduct)
router.delete('/:id', authenticateToken, requireRole("Admin", "Seller"), deleteProductValidation, deleteProduct)

export default router

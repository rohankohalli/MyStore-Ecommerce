import express from 'express'
import { createProduct, deleteProduct, getAllProducts, getMyProducts, getProductById, updateProduct }
    from '../controllers/productController.js'
import { authenticateToken, requireRole } from '../middleware/authentication.js'
import { upload } from '../middleware/upload.js'

const router = express.Router()

router.post("/create", authenticateToken, requireRole("Admin", "Seller"), upload.single("image"), createProduct)
router.get('/my-products', authenticateToken, requireRole("Admin", "Seller"), getMyProducts)
router.get('/', getAllProducts)
router.get('/:id', getProductById)
router.put('/:id', authenticateToken, requireRole("Admin", "Seller"), upload.single("image"), updateProduct)
router.delete('/:id', authenticateToken, requireRole("Admin", "Seller"), deleteProduct)

export default router

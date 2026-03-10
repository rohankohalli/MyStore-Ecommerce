import express from "express";
import { authenticateToken } from "../middleware/authentication.js";
import { addAddress, deleteAddress, getAddress, setDefaultAddress, updateAddress } from "../controllers/addressController.js";

const router = express.Router()

router.get("/", authenticateToken, getAddress)
router.post("/", authenticateToken, addAddress)
router.delete("/:id", authenticateToken, deleteAddress)
router.put("/:id", authenticateToken, updateAddress)
router.put("/:id/default", authenticateToken, setDefaultAddress)

export default router
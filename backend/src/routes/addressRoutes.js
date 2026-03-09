import express from "express";
import { authenticateToken } from "../middleware/authentication.js";
import { addAddress, deleteAddress, getAddress } from "../controllers/addressController.js";

const router = express.Router()

router.get("/", authenticateToken, getAddress)
router.post("/", authenticateToken, addAddress)
router.delete("/:id", authenticateToken, deleteAddress)

export default router
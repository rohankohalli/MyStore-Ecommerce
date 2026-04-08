import express from "express";
import { authenticateToken } from "../middleware/authentication.js";
import { addAddress, deleteAddress, getAddress, setDefaultAddress, updateAddress } from "../controllers/addressController.js";
import { addAddressValidation, deleteAddressValidation, setDefaultAddressValidation, updateAddressValidation } from "../validation/address.validation.js";
import { validate } from "../middleware/validator.js";

const router = express.Router()

router.get("/", authenticateToken, getAddress)
router.post("/", authenticateToken, addAddressValidation, validate, addAddress)
router.delete("/:id", authenticateToken, deleteAddressValidation, validate, deleteAddress)
router.put("/:id", authenticateToken, updateAddressValidation, validate, updateAddress)
router.put("/:id/default", authenticateToken, setDefaultAddressValidation, validate, setDefaultAddress)

export default router
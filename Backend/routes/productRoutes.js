import express from "express";
import multer from "multer";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "../Controllers/productController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Multer memory storage config
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Public routes
router.get("/", getAllProducts);

// Protected admin routes
router.post("/", verifyToken, upload.single("img"), createProduct);
router.put("/:id", verifyToken, upload.single("img"), updateProduct);
router.delete("/:id", verifyToken, deleteProduct);

export default router;

import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

import {
  getAllOrdersAdmin,
  updateOrderStatus,
  getAllUsersAdmin,
} from "../Controllers/adminController.js";

const router = express.Router();

// Admin dashboard test
router.get("/dashboard", verifyToken, isAdmin, (req, res) => {
  res.json({ message: "Welcome Admin Dashboard" });
});

// Orders
router.get("/orders", verifyToken, isAdmin, getAllOrdersAdmin);
router.put("/orders/:id", verifyToken, isAdmin, updateOrderStatus);

// Users
router.get("/users", verifyToken, isAdmin, getAllUsersAdmin);

export default router;


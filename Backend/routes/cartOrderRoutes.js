import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { deleteOrder } from "../Controllers/cartOrderController.js";
import { quantityUpdate } from "../Controllers/cartOrderController.js";

import {
  getCart,
  updateCart,
  clearCart,
  placeOrder,
  getOrders,
} from "../Controllers/cartOrderController.js";

const router = express.Router();

router.use(verifyToken);

router.get("/cart", getCart);
router.post("/cart", updateCart);
router.delete("/cart", clearCart);

router.post("/orders", placeOrder);
router.get("/orders", getOrders);


router.delete("/orders/:id", deleteOrder);
router.put("/cart/quantity", verifyToken, quantityUpdate);




export default router;

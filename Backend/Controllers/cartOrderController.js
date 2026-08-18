import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import mongoose from "mongoose";

// GET Cart of logged-in user
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // create empty cart if not exist
      cart = new Cart({ userId, items: [] });
      await cart.save();
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE Cart (replace whole cart)
export const updateCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items } = req.body; // expect array of cart items with productId, qty etc.

    if (!Array.isArray(items)) {
      return res.status(400).json({ message: "Items must be an array" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items });
    } else {
      cart.items = items;
    }

    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// CLEAR Cart
export const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId });

    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// PLACE ORDER from Cart
export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user's cart
    const cart = await Cart.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total & tax
    const total = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = total * 0.1; // 10% tax

    // Generate order number (similar to frontend method)
    const timestamp = Date.now().toString(36).toUpperCase();
    const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
    const orderNumber = `ORD-${timestamp}-${randomStr}`;

    // Create order
    const newOrder = new Order({
      userId,
      orderNumber,
      items: cart.items,
      total,
      tax,
      status: "confirmed",
      date: new Date(),
    });

    await newOrder.save();

    // Clear cart after placing order
    cart.items = [];
    await cart.save();

    res.json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET Orders of logged-in user
export const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE order by ID (only if owned by user)
export const deleteOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.id;

    // Find order by ID
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if order belongs to logged-in user
    if (order.userId.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized to delete this order" });
    }

    // Delete order
    await Order.findByIdAndDelete(orderId);

    res.json({ message: "Order cancelled successfully" });
  } catch (error) {
    console.error("Delete order error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const quantityUpdate = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      return res.json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { quantityUpdate };

  import Product from "../models/Product.js";

  // CREATE PRODUCT
  export const createProduct = async (req, res) => {
    try {
      const { title, category, desc } = req.body;

      // Price and stock parsing
      const price = Number(req.body.price);
      const stock = Number(req.body.stock);

      // Basic validation
      if (!title || isNaN(price) || isNaN(stock)) {
        return res.status(400).json({ message: "Invalid or missing data" });
      }

      let img = "";
      if (req.file && req.file.buffer) {
        img = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
      }

      const product = new Product({
        title,
        price,
        category,
        desc,
        stock,
        img,
      });

      await product.save();

      return res.status(201).json(product);
    } catch (err) {
      console.error("CREATE PRODUCT ERROR:", err);
      return res.status(500).json({ message: err.message || "Server error" });
    }
  };

  // GET ALL PRODUCTS
  export const getAllProducts = async (req, res) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });
      res.json(products);
    } catch (err) {
      console.error("GET PRODUCTS ERROR:", err);
      res.status(500).json({ message: err.message || "Server error" });
    }
  };

  // UPDATE PRODUCT
  export const updateProduct = async (req, res) => {
    try {
      const updateData = { ...req.body };

      if (req.file && req.file.buffer) {
        updateData.img = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
      }

      const updated = await Product.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      res.json(updated);
    } catch (err) {
      console.error("UPDATE PRODUCT ERROR:", err);
      res.status(500).json({ message: err.message || "Server error" });
    }
  };

  // DELETE PRODUCT
  export const deleteProduct = async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: "Deleted" });
    } catch (err) {
      console.error("DELETE PRODUCT ERROR:", err);
      res.status(500).json({ message: err.message || "Server error" });
    }
  };

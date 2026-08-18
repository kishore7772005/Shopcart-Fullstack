import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function resetPassword() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    const plainPassword = "Admin@123"; // Your new admin password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    let user = await User.findOne({email:"admin@test.com"});

    if(!user){
      console.log("Admin La Etho Pirachanai iruku");
      user = new User ({
        username: "Admin",
        email: "admin@test.com",
        role:"admin",
      });
    }

    user.password = hashedPassword;
    await user.save();

    console.log("Admin password reset successfully");
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

resetPassword();

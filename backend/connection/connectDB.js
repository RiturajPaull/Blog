import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("DB is Connected with Server.");
  } catch (error) {
    console.log("Error connection DB!!", error.mesage);
  }
};

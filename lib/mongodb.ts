import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: "propmatics",  // ✅ ensures the DB name is always correct
    });
    isConnected = true;
    console.log("✅ MongoDB connected to propmatics database");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
};

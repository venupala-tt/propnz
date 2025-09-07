import mongoose from "mongoose";

let isConnected = false; // Track the connection status (important for Vercel serverless)

// Function to connect to MongoDB
export const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: "propmatics", // ✅ ensures all models use the propmatics DB
    });

    isConnected = true;
    console.log("✅ MongoDB connected to propmatics database");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

import mongoose from "mongoose";

export function connectDB() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("successfully connected to MongoDB");
    });
    connection.on("error", () => {
      console.error("MongoDB connection error");
      process.exit();
    });
  } catch (error) {
    console.error(error);
  }
}

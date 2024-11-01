import mongoose from "mongoose";

export async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);

    if (conn) {
      console.log("successfully connected to MongoDB: ", conn.connection.name);
    }
  } catch (error) {
    console.error("Fail to connect, something went wrong ...", error);
  }
}

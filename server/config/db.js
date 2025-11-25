import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/job-portal`);
    console.log("Database Connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }

  mongoose.connection.on("error", (err) =>
    console.log("Database Connection Error:", err)
  );
};

export default connectDB;

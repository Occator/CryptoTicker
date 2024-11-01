import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
  },
  selectedCoins: {
    type: Array,
    default: [],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
    default: "",
  },
  // walletPublicKey: String,
  // forgotPasswordToken: String,
  // forgotPasswordTokenExpiry: Date,
  // verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;

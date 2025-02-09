import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    phone: { type: String },
    address: {
      street: String,
      city: String,
    },
    isConfirmed:{type: Boolean, default: false}
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;

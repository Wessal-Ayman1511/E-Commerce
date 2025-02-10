import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {type: Boolean, required: true, default:false},
    phone: { type: Number},
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

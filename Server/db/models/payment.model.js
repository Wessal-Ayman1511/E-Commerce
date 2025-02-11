import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    method: { type: String, enum: ["Credit Card", "PayPal", "COD"], required: true },
    transactionId: { type: String, unique: true },
    status: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Pending" },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;

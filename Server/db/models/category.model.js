import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true , trim: true, maxLength: 32},
    image: {type: String}
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;

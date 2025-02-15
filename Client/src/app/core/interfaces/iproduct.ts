// src/app/core/interfaces/product.interface.ts

export interface Iproduct {
  _id: string;
  name: string;
  image: string;
  brand: string;
  quantity: number;
  category: ICategory;
  description: string;
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
  reviews: IReview[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ICategory {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  image: string;
}

interface IReview {
  name: string;
  rating: number;
  comment: string;
  user: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

// interface Category {
//   _id: string;
//   name: string;
//   slug: string;
//   image: string;
// }

// interface Subcategory {
//   _id: string;
//   name: string;
//   slug: string;
//   category: string;
// }

// export interface IProduct {
//   _id: string;
//   name: string;
//   image: string;
//   brand: string;
//   quantity: number;
//   category: ICategory;
//   description: string;
//   rating: number;
//   numReviews: number;
//   price: number;
//   countInStock: number;
//   reviews: IReview[];
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }

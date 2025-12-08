import mongoose, { Schema } from "mongoose";

const salesSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
    },
    customerName: String,
    phoneNumber: Number,
    gender: String,
    age: Number,
    customerRegion: String,
    customerType: String,

    productId: String,
    productName: String,
    brand: String,
    productCategory: String,
    tags: [String],

    quantity: Number,
    pricePerUnit: Number,
    discountPercentage: Number,
    totalAmount: Number,
    finalAmount: Number,

    date: Date,
    paymentMethod: String,
    orderStatus: String,
    deliveryType: String,
    storeId: String,
    storeLocation: String,
    salespersonId: String,
    employeeName: String,
  },
  {
    timestamps: true,
    strict:false,
    collection: "sales_management"
  }
);


export const Sale = mongoose.model("Sale", salesSchema);

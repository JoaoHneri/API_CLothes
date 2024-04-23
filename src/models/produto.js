const mongoose = require("mongoose");

const { Schema } = mongoose;

const produto = new Schema({
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productSizes: [
    {
      size: String,
      quantity: Number,
    },
  ],
  productCategory: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productQuantity: {
    type: Number,
    required: true,
  },
  src: { type: String,
     required: true },
});

module.exports = mongoose.model("Produto", produto);

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
  productColors: {
    type: String,
    require: false,
  },
  productSizes: [
    {
      size: String, 
      quantity: Number,
    },
  ],
  productDescription: {
    type: String,
    required: true,
  },
  productQuantity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Produto", produto);

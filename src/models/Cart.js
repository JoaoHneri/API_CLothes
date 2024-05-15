const mongoose = require("mongoose");
const { Schema } = mongoose;

const Cart = new Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    auto: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  idProd: 
  { type: String,
     required: true },
  productName:
   { type: String,
    required: true },
  productPrice: 
  { type: Number,
     required: true },
  productSizes: 
  { type: String,
     required: true },
  productQuantity: 
  { type: Number,
     required: true },
  src: 
  { type: String,
     required: true },
});

module.exports = mongoose.model("Cart", Cart);

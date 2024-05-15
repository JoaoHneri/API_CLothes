const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  idProd: {
    type: String,
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productName: {
    type: String,
    required: true
  },
  productPrice: {
    type: Number,
    required: true
  },
  productSizes: {
    type: String,
    required: true
  },
  productQuantity: {
    type: Number,
    required: true
  },
  src: {
    type: String,
    required: true
  },
  status:{
    type: String,
    required: true
  },
});



module.exports =  mongoose.model('Payment', PaymentSchema);

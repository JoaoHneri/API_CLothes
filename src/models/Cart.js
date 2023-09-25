const mongoose = require('mongoose');
const {Schema} = mongoose;

const Cart = new Schema({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
    }],
    userName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "buyerUser",
    }

});

module.exports = mongoose.model('Cart', Cart);
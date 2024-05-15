const mongoose = require('mongoose');
const {Schema} = mongoose;

const Cart = new Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        auto: true
    },
    idProd: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "produto",
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "buyerUser",
    }

});

module.exports = mongoose.model('Cart', Cart);
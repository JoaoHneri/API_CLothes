const mongoose = require('mongoose');
const {Schema} = mongoose;

const Cart = new Schema({
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
const mongoose = require('mongoose');

const {Schema} = mongoose;

const buyerUser = new Schema({
    userName:{
        type: String,
        required: true,
    },
    userPassword:{
        type: String,
        required: true,
    },
    userUsername:{
        type: String,
        required: true,
    },
    userEmail:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("BuyerUser", buyerUser);
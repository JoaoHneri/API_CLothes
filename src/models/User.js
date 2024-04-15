const mongoose = require('mongoose');

const { Schema } = mongoose;

const buyerUser = new Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        auto: true
    },
    userName: {
        type: String,
        required: true,
    },
    userPassword: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("BuyerUser", buyerUser);

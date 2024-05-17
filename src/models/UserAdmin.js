const mongoose = require('mongoose');

const { Schema } = mongoose;

const userAdmin = new Schema({
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
    },
    isAdmin: {
        type: Boolean,
        required: true,
    },
    Rent:{
        type: Number,
        required: false,
    },
    Orders: {
        type: Number,
        required: false,
    },



});

module.exports = mongoose.model("userAdmin", userAdmin);

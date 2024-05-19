const mongoose = require('mongoose');

const EnderecoSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BuyerUser', 
        required: true
    },
    endereco: {
        type: String,
        required: true
    },
    bairro: {
        type: String,
        required: true
    },
    numero: {
        type: String,
        required: true
    },
    cidade: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    cep: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Endereco', EnderecoSchema);

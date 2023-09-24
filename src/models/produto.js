const mongoose = require('mongoose');

const {Schema} = mongoose;

const produto = new Schema({
    name:{
       type: String,
       required: true,
    },
    price:{
        type:   Number,
        required: true,
    },
    colors:{
        type: String,
        require: true,
    },
    sizes:{
        type: String,
        require: true
    },
})

 
module.exports = mongoose.model('Produto', produto);
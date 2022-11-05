const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Cliente = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    cpf: {
        type: String
    },
    phone_number: {
        type: Number
    },
}, {
    collection: 'cliente'
});

module.exports = mongoose.model('Cliente', Cliente);
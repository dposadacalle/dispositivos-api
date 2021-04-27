const mongoose = require('mongoose');

const ComandoSchema = new mongoose.Schema({
    descripcion: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
    }
});

module.exports = { ComandoSchema }
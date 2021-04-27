const mongoose = require('mongoose');

const candadoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        trim: true
    },
    laptitud: {
        type: Number
    },
    longitud: {
        type: Number
    },
    ultimoRegistro: {
        type: Date
    },
    estadoCerrojo: {
        type: String
    },

    ultimosPuntos: [{
        localizacion: {
            type: {
                type: String,
                enum: ['Point'],
                required: true
            },
            coordinantes: {
                type: [Number],
                required: true
            }
        }
    }],
    estaEnViaje: {
        type: Boolean,
        default: false
    },
    imagen: {
        type: String
    },
    ultimaTransmision: {
        type: Date,
        max: 8
    },
    terminalID: {
        type: Number,
        unique: true,
        index: true,
        maxLength: 12
    }
});

module.exports = { candadoSchema };
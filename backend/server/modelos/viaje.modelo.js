const mongoose = require('mongoose');

const ViajeSchema = new mongoose.Schema({
    origen: {
        type: String,
        requiried: true,
        trim: true
    },
    destino: {
        type: String,
        requiried: true,
        trim: true
    },
    candado: {
        _id: {
            type: mongoose.Types.ObjectId
        },
        nombre: {
            type: String,
            required: true
        }
    },
    ultimosPuntosViaje: [{
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
    fechaCreacion: {
        type: Date,
        requiried: true
    }
});

module.exports = { ViajeSchema }
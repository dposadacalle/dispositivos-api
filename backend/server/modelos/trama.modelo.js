const mongoose = require('mongoose');

const TramaSchema = new mongoose.Schema({
    terminalID: {
        type: Number
    },
    latitud: {
        type: Number
    },
    longitud: {
        type: Number
    },
    fechaActual: {
        type: Date
    }
});

module.exports = { TramaSchema };
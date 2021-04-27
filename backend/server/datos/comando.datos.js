const mongoose = require('mongoose');

const { ComandoSchema } = require('../modelos/comando.modelo');

ComandoSchema.statics.guardarComando = async function(data) {
    try {
        if (data) {
            let comando = new Comando(data);

            return await comando.save();
        }
    } catch (error) {
        console.log(eror);
    }
}

ComandoSchema.statics.findAll = async function() {

    const obj = {
        dta: null,
        err: false
    };

    try {
        obj.dta = await Comando.find({});
    } catch (error) {
        obj.dta = error;
        obj.err = true;
    }

    return obj;
}

const Comando = mongoose.model('Comando', ComandoSchema);
module.exports = { Comando }
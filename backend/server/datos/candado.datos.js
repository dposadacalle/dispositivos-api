const mongoose = require('mongoose');

const { candadoSchema } = require('../modelos/candado.modelo');

candadoSchema.methods.actualizar = function() {
    let candado = this;

    candado.longitud = 7;
    candado.latitud = 6;
    candado.save();

    return candado;
}

candadoSchema.statics.buscarCandadoId = async function(id) {

    const obj = {
        dta: null,
        err: false
    };

    try {
        obj.dta = await this.findOne({ _id: mongoose.Types.ObjectId(id) });
    } catch (error) {
        obj.dta = null;
        obj.err = true;
    }

    return obj;
}

candadoSchema.statics.mostrarTodos = async() => {

    const obj = {
        dta: null,
        err: false
    };

    try {
        obj.dta = await Candado.find({});
    } catch (error) {
        obj.dta = error;
        obj.err = true;
    }

    return obj;
}

candadoSchema.statics.actualizar = async function(datos) {

    const obj = {
        dta: null,
        err: false
    };

    try {
        obj.dta = await this.find().forEach(function() {
            this.update({}, { ultimosPuntos: datos })
        });
    } catch (error) {
        obj.dta = null;
        obj.err = true;
    }

    return obj;
}

candadoSchema.statics.mostrarCandadoId = async function(id) {
    const obj = {
        dta: null,
        err: false
    };

    try {
        obj.dta = await Candado.findOne({ _id: mongoose.Types.ObjectId(id) });
    } catch (error) {
        obj.dta = error;
        obj.err = true;
    }

    return obj;
}

candadoSchema.statics.crear = async function(body) {

    let candado = new Candado(body);

    let doc = await candado.save();

    return doc;
}

candadoSchema.statics.actualizarFecha = async function(fecha, id) {

    const obj = {
        dta: null,
        err: false
    };

    let candadoId = mongoose.Types.ObjectId(id);

    console.log(fecha, id);

    try {
        obj.dta = await this.findOneAndUpdate({ _id: candadoId }, { $set: { ultimoRegistro: fecha } }, { new: true });
    } catch (error) {
        obj.dta = error;
        obj.err = true;
    }

    return obj;
}

candadoSchema.statics.actualizarUltimosPuntos = async function(id, datos) {

    const obj = {
        dta: null,
        err: false
    };

    try {
        obj.dta = await this.updateOne({ _id: id }, { ultimosPuntos: datos });
    } catch (error) {
        obj.dta = null;
        obj.err = true;
    }

    return obj;
}

candadoSchema.statics.actualizarEstado = async function(estado, id) {

    const obj = {
        dta: null,
        err: false
    };

    try {
        console.log('test');
        console.log(estado, id);

        let candadoId = mongoose.Types.ObjectId(id);
        obj.dta = await this.findOneAndUpdate({ _id: candadoId }, {
            $set: { estadoCerrojo: estado }
        }, { new: true });

        console.log(obj.dta)

    } catch (error) {
        obj.dta = error;

        obj.err = true;
    }

    return obj;
}

candadoSchema.statics.actualizarEstaEnViaje = async function(id) {

    const obj = {
        dta: null,
        err: false
    };

    try {
        obj.dta = await this.findOneAndUpdate({ _id: id }, { estaEnViaje: true });

    } catch (error) {
        obj.dta = null;
        obj.err = true;
    }

    return obj;
}

candadoSchema.statics.actualizarDatosDispositivos = async function(datos) {

    const obj = {
        dta: null,
        err: false
    }

    console.log(datos);
    const { terminalID, ultimaTransmision, latitud, longitud } = datos;

    console.log(terminalID, ultimaTransmision, latitud, longitud);

    try {
        // console.log(datos); 
        if (terminalID != null && ultimaTransmision != null) {
            obj.dta = await this.findOneAndUpdate({ terminalID: terminalID }, {
                $set: {
                    laptitud: latitud,
                    longitud,
                    ultimaTransmision
                }
            }, { new: true });
        }
    } catch (error) {
        obj.dta = null;
        obj.err = true;
    }

    return obj;
}

candadoSchema.statics.buscarCandadoActive = async function() {

    const obj = {
        dta: null,
        err: false
    };

    try {
        obj.dta = await this.find({ estaEnViaje: true });

    } catch (error) {
        obj.dta = null;
        obj.err = true;
    }

    return obj;
}

candadoSchema.statics.buscarCandadoTodos = async function() {

    const obj = {
        dta: null,
        err: false
    };

    try {
        // El metodo find de mongoose, retorna un array con la data de la coleccion
        obj.dta = await this.find({});
    } catch (error) {
        obj.dta = null;
        obj.err = true;
    }

    return obj;
}

const Candado = mongoose.model('Candado', candadoSchema);
module.exports = { Candado }
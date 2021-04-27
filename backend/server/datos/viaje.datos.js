const mongoose = require('mongoose');

const { ViajeSchema } = require('../modelos/viaje.modelo');

// Creamos dos metodos 

// 1: Crear un viaje

ViajeSchema.statics.crearViaje = async(data) => {

    // creamos instancia de Modelo Viaje y le enviamos la Data (body)
    const viaje = new Viaje(data);

    return await viaje.save(); // Guardamos data en coleccion viaje
}


// 2: Actualizar la data de los viajes (Excepto Propiedad Ultimos Puntos del Viaje)

ViajeSchema.statics.updateViaje = async function(filtro, datos) {

    // console.log(datos);

    const obj = {
        dta: null,
        err: false
    };

    try {
        obj.dta = await this.findOneAndUpdate(filtro, { $set: { origen: datos.origen, destino: datos.destino, fechaCreacion: datos.fechaCreacion } })
    } catch (error) {
        obj.dta = null;
        obj.err = true;
    }

    return obj;
}

ViajeSchema.statics.buscarViajeIdCandado = async function(candadoId) {

    const obj = {
        dta: null,
        err: false
    };

    try {
        // A la propiedad dta del obj, le asignamos el resultado de la consulta,
        // con el metood findOne filtramos por candado en su propiedad id, 
        // SI exisite un dispositivo, este activo. 
        // nos retorna un documento
        obj.dta = await this.findOne({ "candado._id": candadoId });
    } catch (error) {
        obj.dta = null;
        obj.err = true;
    }

    return obj;
}

ViajeSchema.statics.actualizarUltimosPuntosViaje = async function(filtro, ultimosPuntos) {

    const obj = {
        dta: null,
        err: false
    };

    try {
        obj.dta = await this.update(filtro, { $set: { ultimosPuntosViaje: ultimosPuntos } });
    } catch (error) {
        obj.dta = null;
        obj.err = true;
    }

    return obj;
}

const Viaje = mongoose.model('Viaje', ViajeSchema)
module.exports = { Viaje }
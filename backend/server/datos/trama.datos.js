const mongoose = require('mongoose');

const { DateTime } = require('luxon');

const { TramaSchema } = require('../modelos/trama.modelo');

TramaSchema.statics.guardarTrama = async function(data) {

    try {

        let trama = new Trama(data);

        return await trama.save();

    } catch (error) {
        console.log(error);
    }
}

TramaSchema.statics.findAllTramas = async function() {

    const obj = {
        dta: null,
        err: false
    };

    try {
        obj.dta = await this.find({});
    } catch (error) {
        obj.dta = null;
        obj.err = true;
    }

    return obj;
}

TramaSchema.statics.buscarTramas = async function(data) {

    const { terminalID, fechaInicio, fechaFin } = data;

    const obj = {
        dta: null,
        err: false
    };

    try {

        // obj.dta = await this.aggregate(
        //     [{
        //         $match: {
        //             terminalID,
        //             fechaActual: {
        //                 $gt: DateTime.fromISO('2021-04-26T13:30:40.294Z'),
        //                 $lt: DateTime.fromISO('2021-04-26T13:33:40.294Z')
        //             }
        //         }
        //     }, {
        //         $project: {
        //             fechaActual: 1
        //         }
        //     }]
        // );

        // console.log(DateTime.fromISO(fechaInicio));

        const fchInicio = DateTime.fromISO(fechaInicio, { setZone: true })
        const fchFin = DateTime.fromISO(fechaFin, { setZone: true })

        obj.dta = await this.find({
            terminalID,
            fechaActual: {
                $gte: fchInicio,
                $lte: fchFin
            }
        });

    } catch (error) {
        obj.dta = null;
        obj.err = true;
    }

    return obj;
}

const Trama = mongoose.model('Trama', TramaSchema);

module.exports = { Trama }
const { Viaje } = require('../datos/viaje.datos');
const { Candado } = require('../datos/candado.datos');

exports.create = async(req, res, next) => {

    const { body } = req;

    const { candadoId } = req.params;

    console.log(candadoId);

    try {
        const viajeCreado = await Viaje.crearViaje(body);

        await Candado.actualizarEstaEnViaje(candadoId)

        res.json(viajeCreado);
        res.status(201);

    } catch (error) {
        next(new Error(error));
    }
}

exports.actualizarViaje = async(req, res, next) => {

    // Extrae la propiedad Body del Req (Request)
    const datos = {
        origen: req.body.origen,
        destino: req.body.destino,
        fechaCreacion: req.body.fechaCreacion
    };

    console.log(datos);

    const filtro = {
        _id: req.params.id // Capturando la propiedad id que viene del objeto req.params (Query Params)
    }

    console.log(filtro);

    try {
        // Invocamos el Metodo actualizar la data de Viaje,
        // Recibimos esa respuesta dentro de una promesa con Await que hace referencia a un Async
        const viajeUpdated = await Viaje.updateViaje(filtro, datos);

        // Con res (response) hacemos una respuesta al servidor
        res.json({
            data: viajeUpdated.dta,
            success: true,
            status: 201
        });

    } catch (error) {
        next(new Error(error)); // Enviamos varialble error, al callback Next
    }

}
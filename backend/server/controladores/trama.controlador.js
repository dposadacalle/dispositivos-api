const { Trama } = require('../datos/trama.datos');

exports.agregarTramas = async(req, res, next) => {

    const { body } = req;

    try {
        if (!body)
            res.status(404).send({ mensaje: "La Trama no se puedo Guardar" });

        let trama = await Trama.guardarTrama(body);

        res.json(trama);
        res.status(200).send({ mesaje: "Trama guardada Exitosamente" });
    } catch (error) {
        next(new Error(error));
    }
}

exports.mostrarTramas = async(req, res, next) => {

    try {
        const tramas = await Trama.findAllTramas();

        if (tramas.err) res.status(404).send({ mensaje: "Datos de la trama no encontrados" });

        res.json({
            data: tramas.dta,
            status: 200,
        });

    } catch (error) {
        next(new Error(error));
    }
}

exports.consultarTrama = async(req, res, next) => {

    const { body } = req;

    console.log(req.body);
    try {
        const tramas = await Trama.buscarTramas(body);

        console.log(tramas);

        if (tramas.err) res.status(404).send({ mensaje: 'No se Encontraron Tramas' });

        console.log(body);
        res.json({
            data: tramas.dta,
            status: 201
        });

    } catch (error) {
        console.log(error);
        next(new Error(error));

    }
}
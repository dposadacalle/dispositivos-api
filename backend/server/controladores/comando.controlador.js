const { Comando } = require('../datos/comando.datos');
const singleton = require('../Singleton/Singleton');

exports.enviarComandoDispositivo = async(req, res, next) => {
    const { body } = req;

    const { terminalID, comando } = body;

    if (body) {
        let respuesta = singleton.enviarComando(terminalID, comando);

        if (respuesta.err)
            return res.status(404).send({
                mensaje: respuesta.mensaje,
                error: respuesta.err
            });

        res.status(200).send({ mensaje: respuesta.mensaje, error: respuesta.err, isConetion: respuesta.isConection })
    }

}

exports.darAltaComando = async(req, res, next) => {

    const { body } = req;

    try {
        let comandoCreado = await Comando.guardarComando(body);

        res.json({
            data: comandoCreado.dta,
            success: true,
            status: 201
        });
    } catch (error) {
        next(new Error(error));
    }
}

exports.obtenerComandos = async(req, res, next) => {
    try {
        const comandos = await Comando.findAll();

        res.json({
            data: comandos.dta
        });
    } catch (error) {
        next(new Error(error));
    }
}
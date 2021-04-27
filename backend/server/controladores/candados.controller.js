const { Candado } = require('../datos/candado.datos');

const findAll = async(req, res, next) => {

    try {
        const docs = await Candado.mostrarTodos();

        res.json({
            data: docs.dta
        });

    } catch (error) {
        next(new Error(error));
    }
}

const verDetalle = async(req, res, next) => {

    const id = req.params.id;

    try {
        const doc = await Candado.mostrarCandadoId(id);

        res.json({
            data: doc.dta,
            success: true
        });
    } catch (error) {
        next(new Error(error));
    }
}

const create = async(req, res, next) => {

    const { body } = req;

    try {
        const candado = await Candado.crear(body);

        res.status(201);
        res.json(candado);
        res.status({ message: 'Candado ha sido correctamente Creado' });

    } catch (error) {
        next(new Error(error));
    }
};

const actualizarUltimoRegistro = async(req, res, next) => {

    const id = req.params.id;
    const { ultimoRegistro } = req.body

    try {
        console.log(ultimoRegistro);
        console.log(id);

        const updated = await Candado.actualizarFecha(ultimoRegistro, id)

        console.log(updated);

        if (!updated) {
            res.status(404).send({
                message: `No se puede actaulizar id=${id}`
            });
        } else {
            res.json({
                success: true,
                data: updated,
            });
        }

    } catch (err) {
        next(new Error(err));
    }

};

const actualizarEstadoCerrojo = async(req, res, next) => {

    const { estadoCerrojo } = req.body;
    const id = req.params.id;

    try {

        // const candado = await Candado.mostrarCandadoId(id);
        // if (!candado.err) {
        //     let objCandado = candado.dta;

        //     await objCandado.actualizar()

        //     console.log(objCandado);

        // }

        console.log(estadoCerrojo, id);
        const updated = await Candado.actualizarEstado(estadoCerrojo, id);

        console.log(updated.dta);

        res.json({
            success: true,
            data: updated.dta,
        });
    } catch (err) {
        next(new Error(err));
    }

};

module.exports = {
    create,
    actualizarUltimoRegistro,
    actualizarEstadoCerrojo,
    findAll,
    verDetalle
}
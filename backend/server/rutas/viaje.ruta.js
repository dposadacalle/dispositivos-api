const router = require('express').Router();

const viajeControlador = require('../controladores/viaje.controlador');

router.post('/crearViaje/:candadoId', viajeControlador.create);

router.put('/actualizarViaje/:id', viajeControlador.actualizarViaje);

module.exports = router;
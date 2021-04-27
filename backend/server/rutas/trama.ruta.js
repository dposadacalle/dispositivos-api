const router = require('express').Router();

// Importamos controlldor de tramas
const tramaControlador = require('../controladores/trama.controlador');;

router.get('/mostrarTramas', tramaControlador.mostrarTramas);

router.post('/consultarTrama', tramaControlador.consultarTrama);

module.exports = router;
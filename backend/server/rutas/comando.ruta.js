const router = require('express').Router();

const comandoControlador = require('../controladores/comando.controlador');

router.get('/', comandoControlador.obtenerComandos);

router.post('/agregarComando', comandoControlador.darAltaComando);

router.post('/enviarComando', comandoControlador.enviarComandoDispositivo);

module.exports = router;
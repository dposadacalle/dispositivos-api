const express = require("express");

const router = express.Router();

const controllerCandado = require('../controladores/candados.controller');

router.get('/', controllerCandado.findAll);

router.get('/verDetalle/:id', controllerCandado.verDetalle)

router.post('/add', controllerCandado.create);

router.put('/actualizarUltimoRegistro/:id', controllerCandado.actualizarUltimoRegistro)

router.put('/actualizarEstado/:id', controllerCandado.actualizarEstadoCerrojo)


module.exports = router;
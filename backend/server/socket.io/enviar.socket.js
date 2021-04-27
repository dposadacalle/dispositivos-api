const uuid = require('uuid');

const enviarPosiciones = (tipo, objeto) => {
    global[uuid].io.emit(tipo, objeto);
}

module.exports = { enviarPosiciones };
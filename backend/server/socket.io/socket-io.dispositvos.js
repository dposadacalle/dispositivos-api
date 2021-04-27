const socketIO = require('socket.io');
const uuid = require('uuid');

global[uuid] = {};

const inicializarSocket = (server, cors) => {
    // inicializamos IO de socket
    // const io = socketIO();

    global[uuid].io = socketIO(cors);

    global[uuid].io.attach(server);

    // console.log('server :>> ', server);

    // io.attach(server);

    // console.log(io);

    // evento esta escuchando ala respuesta del cliente
    global[uuid].io.on("connection", (socket) => {
        console.log(socket.id);
    })

}
module.exports = { inicializarSocket }
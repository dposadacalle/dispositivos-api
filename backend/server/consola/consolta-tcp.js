// Include Nodejs' net module.
const Net = require('net');

const enviarObjeto = require('../socket.io/enviar.socket');

// Importamos los datos de los dispostivos 
const { Candado } = require('../datos/candado.datos');

// Importamos los datos de Tramas
const { Trama } = require('../datos/trama.datos');

const Singleton = require('../Singleton/Singleton');

// Puerto TCP que se expondrá para escuchar las tramas
const port = 25070;

//  Crea la instancia del servidor TCP
const consolaTcp = new Net.Server();

// Función para inicializar el servidor y escuchar 
consolaTcp.listen(port, function() {
    console.log(`Servidor TCP escuchando en el puerto: ${ port }.`);
});

const singleton = require('../Singleton/Singleton');
const { DateTime } = require('luxon');

// Cuando haya una nueva conexión TCP
consolaTcp.on('connection', function(socket) {
    console.log('Nueva conexión establecida.');

    // let tiempoHeartBeat = 1 * 10000; // Bit de vida

    // socket.setTimeout(tiempoHeartBeat);

    // Se ejecuta cada vez que llega una trama nueva
    socket.on('data', async function(datos) {

        try {
            // Convierto argumento (datos ) a String con (ToString)
            let datosTrama = datos.toString();

            // Con Slice: Extrae La fecha del string (de la trama)
            let fecha = datosTrama.slice(0, 8);

            console.log(fecha.length);

            let fechaTransmision = `${fecha.slice(0, 4)}-${fecha.slice(4,6)}-${fecha.slice(6, 8)}`;

            console.log(fechaTransmision);

            // en Variable Datos trama, con replace reemplaza por una cadena vacia
            datosTrama = datosTrama.replace(fecha, "");

            // Con Split: Separa por el argumento (@) en un Array 
            let arrDatos = datosTrama.split("@");

            if (arrDatos.length == 3) {
                let latitud = parseFloat(arrDatos[0]); // Extrae del array la posion Cero (Latitud)
                let longitud = parseFloat(arrDatos[1]); // Extrae del array la posion, la longitud
                let idCandado = parseInt(arrDatos[2]); // Extrae del array la poscion, el terminal ID

                // Agregar la conexión en el singleton
                Singleton.add(socket, idCandado);
                Singleton.ver();

                const datosDispositivos = {
                    terminalID: idCandado,
                    ultimaTransmision: fechaTransmision,
                    latitud,
                    longitud
                };

                const posiciones = {
                    latitud,
                    longitud
                }

                // Proceso para Actualizamos datos del candado en la base de datos
                procesoActualizarUltimaTransmision(datosDispositivos);

                // Proceso para Emitir el mensaje al cliente angular
                enviarObjeto.enviarPosiciones("reporteLocalizacion", { posiciones, idCandado })

                // Guardamos los datos de trama en la coleccion 
                await Trama.guardarTrama({
                    terminalID: idCandado,
                    latitud,
                    longitud,
                    fechaActual: DateTime.local().toUTC()
                });
            }
        } catch (error) {
            console.log(error);
        }
    });


    // Cuando se finaliza una conexión
    socket.on('end', function() {
        console.log('Cerrando conexión con el cliente');
        eliminarSocket(socket);
    });

    // Don't forget to catch error, for your own sake.
    socket.on('error', function(err) {
        console.log(`Error en la conexión: ${err}`);
        eliminarSocket(socket);
    });

    socket.on('timeout', function() {
        eliminarSocket(socket);
    });
});

function eliminarSocket(socket) {
    if (!socket.destroyed)
        socket.destroy();

    Singleton.delete(socket);
}

async function procesoActualizarUltimaTransmision(datos) {

    try {
        // debugger;
        const updated = await Candado.actualizarDatosDispositivos(datos);

        console.log(updated);

    } catch (error) {
        console.log(error);
    }

}

module.exports = { consolaTcp };
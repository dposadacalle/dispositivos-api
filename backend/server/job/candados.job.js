// Importamos modulo cron y su funcion CronJob
const CronJob = require('cron').CronJob;

const { Candado } = require('../datos/candado.datos');

const { Viaje } = require('../datos/viaje.datos');

const enviarObjeto = require('../socket.io/enviar.socket');

let job = new CronJob('*/30 * * * * *', async function() {

    console.log('Se ejecuta cada 30 segundos');

    try {
        // Declaro la constante candados y le asigno el array con la data de al cosulta a dispositivos
        const candados = await Candado.buscarCandadoTodos();

        if (!candados.err) { // No encuentra un error

            for await (const candado of candados.dta) {
                const posiciones = {
                    latitud: Math.random() * (-90 - 90) + 90,
                    longitud: Math.random() * (-180 - 180) + 180
                };

                await procesoActualizaTodo(candado, posiciones);
                enviarObjeto.enviarPosiciones("reporteUbicacion", { posiciones, _id: candado._id.toHexString() });
            }

        }
    } catch (error) {
        console.error(error);
    }
}, null, false, 'America/Bogota');


async function procesoActualizaTodo(candado, posiciones) {
    await procesoActualizacionCandado(candado, posiciones);
    await procesoActualizacionViaje(candado, posiciones);
}

async function procesoActualizacionCandado(candado, posiciones) {
    // Obtengo desde cada posición o Elemento del arratlo, la propiedad (Array)
    // Ultimos Puntos.
    const ultimosPuntos = candado.ultimosPuntos;

    // Sobre el Array (Ultimos Puntos), inserto con un objeto del tipo GEOJSON, 
    // con la funcion Push (que Inserta o agrega un nuevo elemento a un array)
    ultimosPuntos.push({
        "localizacion": {
            "type": "Point",
            "coordinantes": [posiciones.latitud, posiciones.longitud]
        }
    });

    // Valido la longitud del Array, 
    // Donde Si es mayor a 5 elementos, Elimina y actualiza la primer posicion del array
    // Donde utilizamos la funcion Slice, TIen eun inicio y un hasta. 
    if (ultimosPuntos.length > 5) ultimosPuntos.splice(0, 1);

    // Por cada elemento del arreglo, Invocamos la funcion Save(), 
    // que actualiza un dispositivo en su propiedad ultimos Puntos,
    // Esto lo recibe dentro de una promesa (Await)
    await candado.save();
}

async function procesoActualizacionViaje(candado, posiciones) {
    // Validamos Por cada Item o elemento del Array de Dispositivos, 
    // los dispositivos estan activos (Que su propiedad EstaEnViaje sea igual a true)
    if (candado.estaEnViaje) { // Tiene un viaje ACTIVO

        // Declaramos la constante candadoId, le asignamos el valor (dato), 
        // Este el item del elemento del array de dispositivos. 
        const candadoId = candado._id;

        // Declaramos un constante viaje, y le asignamos el resultado obtenido de una promesa, 
        // En Viaje invocamos un metodo que le pasamos el id del dispositivo, 
        // en esa instante, retorna en la constante viaje, un documento, 
        // Si existe ese Id dentro del viaje, 
        const viaje = await Viaje.buscarViajeIdCandado(candadoId);

        // Validamos que No exista un error, y tenga la menos un viaje creado
        if (!viaje.err && viaje.dta) { // QUE EXISTA UN VIAJE

            // Declaramos la constante y le asignamos la propiedad es de tipo (Array)
            const ultimosPuntosViaje = viaje.dta.ultimosPuntosViaje;

            // En el Array, agregamos un nuevo objeto tipo (GEOJSON), con su Type y 
            // Coordenantes 
            ultimosPuntosViaje.push({
                "localizacion": {
                    "type": "Point",
                    "coordinantes": [posiciones.latitud, posiciones.longitud]
                }
            });

            // Validamos el tamaño del Array, donde si es mayor 5 elementos, 
            // Nos elimine el valor en la primera posición y Rempleza solo un valor, 
            // Con la funcion Splice (INICIO, HASTA)
            if (ultimosPuntosViaje.length > 5) ultimosPuntosViaje.splice(0, 1);

            // Guardamos el resultados con la funcion Save(), y lo recimos dentro 
            // una promesa con await
            await viaje.dta.save();

        }
    }
}

module.exports = { job };
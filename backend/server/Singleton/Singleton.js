class Singleton {

    constructor() {
        this.data = [];
    }

    // Agregar la conexión a un array
    add(socket, idCandado) {

        // Preguntar si ya existe una conexión con ese id del candado
        let index = this.data.findIndex((e) => e.idCandado == idCandado);

        // No hay conexiones para ese candado
        if (index < 0) {
            this.data.push({
                idCandado,
                socket
            });
        }
    }

    ver() {
        console.log(this.data);
    }

    delete(socket) {
        // Preguntar si ya existe una conexión con ese id del candado
        let index = this.data.findIndex((e) => e.socket.remoteAddress == socket.remoteAddress);
        if (index > -1) {
            // Eliminarlo del array

            this.data.splice(index, 1);
        }
    }

    enviarComando(idCandado, comando) {
        let respuesta = {
            err: false,
            isConection: false,
            mensaje: ''
        }

        let index = this.data.findIndex((e) => e.idCandado == idCandado);

        if (index > -1) {
            this.data[index].socket.write(comando);
            // console.log(comando);
            respuesta.mensaje = `Comando ${ comando } enviado correctamente`;
            respuesta.isConection = true;
            respuesta.err;
        } else {
            respuesta.err = true;
            respuesta.mensaje = "No hay una conexión para ese candado";
        }

        return respuesta;
    }

}

const singleton = new Singleton();

module.exports = singleton;
const express = require('express');
const bodyParser = require('body-parser');

// Importamos la consola TCP
const { consolaTcp, scketsList } = require('./consola/consolta-tcp');

// Init App
const app = express();

const server = require('http').Server(app);

// Permite o autorizan que servicios externos puedan consumir los servicios
const cors = require('cors');

// Importamos la libreria o (paquete) Socket.io,
// le pasamos como argumento la variable server

var corsOptions = {
    origin: true,
    // origin: function (origin, callback) {
    //     // if (whitelist.indexOf(origin) !== -1) {
    //         callback(null, true)
    //     // } else {
    //     //     callback(new Error('Not allowed by CORS'))
    //     // }
    // },
    methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS', 'PUT'],
    allowedHeaders: ['xAuth', 'Content-Type', 'X-Requested-With'],
    exposedHeaders: ['xAuth', 'Content-Type', 'Accept'],
    credentials: true
}

app.use(cors(corsOptions));
// app.use(cors({ origin: 'http://localhost:4200' }));

// Imprime en consola las peticiones http que hacen cada servicio
const morgan = require("morgan");

const config = require('./config');
const database = require('./db/moongese');

// Connect to database
database.conectar(config.database, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

// const { job } = require('./job/candados.job');

// Importación de rutas
const rutasCandados = require('./rutas/candado.ruta');
const rutasViajes = require('./rutas/viaje.ruta');
const rutasComandos = require('./rutas/comando.ruta');
const rutasTramas = require('./rutas/trama.ruta');

// importamos archivo del WebSocket-Server
const webSocket = require('./socket.io/socket-io.dispositvos');

app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json({ limit: '10mb', extended: true }));

app.use(morgan("dev"));

app.use('/candados', rutasCandados);
app.use('/viajes', rutasViajes);
app.use('/comandos', rutasComandos);
app.use('/reporteTramas', rutasTramas);

app.use((req, res, next) => {
    next({
        message: 'Route not found',
        statusCode: 404,
        level: 'warn',
    });
});


server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running at port ${ process.env.SERVER_PORT }`);
});

webSocket.inicializarSocket(server, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST", "PUT"],
        credentials: true
    }
});

console.log(scketsList);

// ejecutamos las tareas
// job.start();
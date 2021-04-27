const mongoose = require('mongoose');

exports.conectar = ({ protocol, url, username, password },
    options = {}
) => {
    let dburl = '';

    // Required auth
    if (username && password) {
        dburl = `${protocol}://${username}:${password}@${url}`;
    } else {
        // eslint-disable-next-line no-unused-vars
        dburl = `${protocol}://${url}`;
    }

    mongoose.connect(dburl, {
        ...options,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    });

    mongoose.set('debug', true)

    mongoose.connection.on('open', () => {
        console.log("Database connected");
    });

    mongoose.connection.on('close', () => {
        console.log("Database disconnected");
    });

    mongoose.connection.on('error: ', (err) => {
        console.log(`Database connection error: ${err}`);
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('Database connection disconnected through app termination');
            process.exit(0);
        });
    });
};

exports.disconnect = () => {
    mongoose.connection.close(() => {
        console.log('Database disconnected');
    });
};
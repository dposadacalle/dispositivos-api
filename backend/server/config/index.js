const path = require('path');

const env = process.env.NODE_ENV || 'development';
require('dotenv').config({ path: path.join(__dirname, `./../../.env.${ env }`) });

const config = {
    database: {
        protocol: process.env.DATABASE_PROTOCOL,
        url: process.env.DATABASE_URL,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
    }
};

module.exports = config;
const serverless = require('serverless-http');
const app = require('./app'); // Importa la app desde app.js

module.exports.handler = serverless(app); // Utiliza la aplicación importada
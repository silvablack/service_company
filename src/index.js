/**
 * @author Paulo Silva
 * @description Server
 * @returns listen(PORT,HOST)
 * @version 1.0.0
 */
const app = require('./app');

/**
 * @description Define host and port to server listening
 */
const _PORT = process.env.PORT_SERVICE_COMPANY;
const _HOST = process.env.URL_SERVICE_COMPANY;

/**
 * @description init listening
 */
app.listen(_PORT,_HOST);
console.log(`Servidor rodando em http://${_HOST}:${_PORT}`);
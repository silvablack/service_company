/**
 * @author Paulo Silva
 * @description Server
 * @returns listen(PORT,HOST)
 * @version 1.0.0
 */

'use strict';
/**
 * @requires express server
 */
const express = require('express');

/**
 * @constructor express()
 */
const app = express();

/**
 * @requires body parser to Response
 */
const bodyParser = require("body-parser");

/**
 * @requires config routes to site index and company
 */
const index = require("./routes/index");
const companyRoute = require("./routes/companyRoute");

/**
 * @description Define host and port to server listening
 */
const _PORT = 5010;
const _HOST = '0.0.0.0';


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

/**
 * @description Set routes config on server
 */
app.use('/', index);
app.use('/company', companyRoute);

/**
 * @description init listening
 */
app.listen(_PORT,_HOST);
console.log(`Servidor rodando em http://${_HOST}:${_PORT}`);
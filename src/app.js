/**
 * @author Paulo Silva
 * @description Server
 * @returns instace express
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

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

/**
 * @requires config routes to site index and company
 */
const index = require("./routes/index");
const companyRoute = require("./routes/companyRoute");

/**
 * @description Set routes config on server
 */
app.use('/', index);
app.use('/company',companyRoute);

module.exports = app;
'use strict';

const express = require('express');
const app = express();

const router = express.Router();
const bodyParser = require("body-parser");

// ROTAS
const index = require("./routes/index");
const companyRoute = require("./routes/company");

const _PORT = 5000;
const _HOST = '0.0.0.0';


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/',index);
app.use('/company', companyRoute);

app.listen(_PORT,_HOST);
console.log(`Servidor rodando em http://${_HOST}:${_PORT}`);

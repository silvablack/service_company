'use strict';

const express = require('express');

const _PORT = 5000;
const _HOST = '0.0.0.0';

const app = express();

app.get('/',(req,res)=>{
    res.send('Alô mundo\n');
})

app.listen(_PORT,_HOST);
console.log(`Servidor rodando em http://${_HOST}:${_PORT}`);

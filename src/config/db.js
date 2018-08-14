'use strict';

const mongoose = require('mongoose');
mongoose.connect('mongodb://mongo:27017/db_challenge',{ useNewUrlParser: true });

var Schema = mongoose.Schema;

var companySchema = new Schema({
    name: String,
    mail: String,
    cnpj: String
});

var Company = mongoose.model('Company',companySchema);

module.exports = Company;
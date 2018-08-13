var mongoosee = require('mongoose')
mongoosee.connect('mongodb://127.0.0.1/db_employees')

var Schema = mongoosee.Schema;

var companySchema = new Schema({
    name: String,
    mail: String
});

var Company = mongoosee.model('Company',companySchema);

module.exports = Company;
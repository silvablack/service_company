'use strict';

var mongoose = require('mongoose')
var Company = require('../config/db');

module.exports = new class CompanyRepository{
    getAll(){
        return Company.find();
    }
    getById(){
        return Company.findById();
    }
    create(company){
        return Company.create(company);
    }
    update(id, company){
        const updatedcompany = {
            name: company.name,
            mail: company.mail
        }
        return Company.findByIdAndUpdate(id, updatedcompany, {new: true});
    }
    delete(id){
        return Company.findByIdAndRemove(id);
    }
}
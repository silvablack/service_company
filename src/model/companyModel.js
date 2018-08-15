/**
 * @author Paulo Silva
 * @description Company Model Service
 * @returns methods <getAll, getById, create, update, delete>
 * @version 1.0.0
 */
'use strict';

 /**
  * @requires config/db {Company Schema}
  */
var Company = require('../config/db');

module.exports = new class CompanyModel{
    /**
     * @returns Company.find()
     */
    getAll(){
        return Company.find();
    }
    /**
     * @returns Company.findById()
     */
    getById(){
        return Company.findById();
    }
    /**
     * 
     * @param {_id: String, name: String, mail: String<validate|mail>, cnpj: int} company 
     * @returns Company.create()
     */
    create(company){
        return Company.create(company);
    }
    /**
     * 
     * @param {_id}{_id: String, name: String, mail: String<validate|mail>, cnpj: int} company 
     * @returns Company.findByIdAndUpdate()
     */
    update(id, company){
        const updatedcompany = {
            name: company.name,
            mail: company.mail,
            cnpj: company.cnpj
        }
        return Company.findByIdAndUpdate(id, updatedcompany, {new: true});
    }
    /**
     * 
     * @param {String} id 
     * @returns Company.findByIdAndRemove(id)
     */
    delete(id){
        return Company.findByIdAndRemove(id);
    }
}
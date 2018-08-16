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
    getById(id){
        return Company.findById(id);
    }
    /**
     * 
     * @param {_id: String, name: String, mail: String<validate|mail>, cnpj: String} 
     * @returns Company.create()
     */
    create(company){
        return Company.create(company);
    }
    /**
     * 
     * @param _id {_id: String, name: String, mail: String<validate|mail>, cnpj: String} 
     * @returns Company.findByIdAndUpdate()
     */
    update(id, company){
        return Company.findByIdAndUpdate(id, company, {new: true});
    }
    /**
     * 
     * @param id
     * @returns Company.findByIdAndRemove(id)
     */
    delete(id){
        return Company.findByIdAndRemove(id);
    }
}
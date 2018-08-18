'use strict';
import HttpStatus from 'http-status';
/**
 * @author Paulo Silva
 * @description Company Controller Service
 * @returns methods <get, getById, post, put, delete>
 * @version 1.0.0
 */

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
    data,
    statusCode,
  });
  
  const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
    error: message,
  }, statusCode);


class CompanyController{

    constructor(Company, cache = true){
        /**
         * @requires Company Model
         */
        this.CompanyModel = Company;

        if(cache){
            this.cache = cache;
            /**
             * @requires Redis Data Cache
             */
            this.redis = require("redis");
            /**
             * @constructor Redis Client
             */
            this.client = this.redis.createClient(`redis://${process.env.URL_CACHE_COMPANY}`);
        }
        
    }

    /**
     * @name get
     * @description Send request to find all companies
     * @param {Request} req 
     * @param {Response} res 
     * @returns {Object}[] Company
     */
    get(){
        return new Promise((resolve,reject)=>{
        if(this.cache){
            if(reply){
                this.client.get("allCompanies", (err, reply)=>{
                console.log('cached');
                resolve(defaultResponse(reply));
                });  
            } 
        }else{
            console.log('find db');
            
                this.CompanyModel.getAll()
                .then((company)=>{
                    if(this.cache){
                       this.client.set('allCompanies',JSON.stringify(company));
                       this.client.expire('allCompanies',20);
                    }
                   resolve(defaultResponse(company));
               }).catch(err => reject(errorResponse(err.message)));
            
            }
        });
    }

    /**
     * @name getById
     * @description Send Request to Find Model By ID
     * @param {Request} req 
     * @param {Response} res
     * @method getById
     * @returns {Object} Company
     */
    getById(){
        return new Promise((resolve,reject)=> {
            CompanyModel.getById(req.params.id)
            .then((company)=>{
                resolve(defaultResponse(company));
            }).catch(err => reject(errorResponse(err.message)));
        })
    }

    /**
     * @name post
     * @description Send Company Object to Create Model
     * @param {Request} req 
     * @param {Response} res
     * @method create
     * @returns {Object} Company
     */
    post(){
        const data = req.body;
        CompanyModel.create(data)
        .then((company)=>{
            res.status(200).send(company);
        }).catch(err => res.status(500).send(err));
    }

    /**
     * @name put
     * @description Send Param ID and Data Company to Model Update
     * @param {Request} req 
     * @param {Response} res
     * @method update
     * @returns {Object} Company
     */
    put(){
        const data = req.body;
        CompanyModel.update(req.params.id,data)
        .then((company)=>{
            res.status(201).send(company);
        }).catch(err => res.status(500).send(err));
    }

    /**
     * @name delete
     * @description Delete Company data on Mongo
     * @param {Request} req 
     * @param {Response} res
     * @method delete
     * @returns {Object} INFO JSON
     */
    delete(){
        CompanyModel.delete(req.params.id)
        .then(()=>{
            res.status(200).send({delete: true});
        }).catch(err => console.error.bind(console, `Error $(err)`));
    }
}

module.exports = CompanyController;
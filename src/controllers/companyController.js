/**
 * @author Paulo Silva
 * @description Company Controller Service
 * @returns methods <get, getById, post, put, delete>
 * @version 1.0.0
 */
'use strict';

/**
 * @requires Company Model
 */
const CompanyModel = require('../model/companyModel');

/**
 * @requires Redis Data Cache
 */
var redis = require("redis");
/**
 * @constructor Redis Client
 */
var client = redis.createClient(`redis://${process.env.URL_CACHE_COMPANY}`);

/**
 * @name get
 * @description Send request to find all companies
 * @param {Request} req 
 * @param {Response} res 
 * @returns {Object}[] Company
 */
exports.get = (req,res)=>{
    client.get("allCompanies", (err, reply)=>{
        if(reply){
            console.log('cached');
            res.send(reply);
        }else{
            console.log('find db');
            CompanyModel.getAll()
            .then((company)=>{
                client.set('allCompanies',JSON.stringify(company));
                client.expire('allCompanies',20);
                res.status(200).send(company);
            }).catch(err => res.status(500).send(err));
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
exports.getById = (req,res)=>{
    CompanyModel.getById(req.params.id)
    .then((company)=>{
        res.status(200).send(company);
    }).catch(err => res.status(500).send(err));
}

/**
 * @name post
 * @description Send Company Object to Create Model
 * @param {Request} req 
 * @param {Response} res
 * @method create
 * @returns {Object} Company
 */
exports.post = (req,res)=>{
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
exports.put = (req,res)=>{
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
exports.delete = (req,res)=>{
    CompanyModel.delete(req.params.id)
    .then(()=>{
        res.status(200).send({delete: true});
    }).catch(err => console.error.bind(console, `Error $(err)`));
}
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
var client = redis.createClient('redis://redis:6379');

/**
 * @name get
 * @description Request all data on Mongo or Redis if cached
 * @param {Request} req 
 * @param {Response} res 
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
 * @description Request one Company data on Mongo
 * @param {Request} req 
 * @param {Response} res
 * @returns {ObjectJson}
 */
exports.getById = (req,res)=>{
    CompanyModel.getById(req.params.id)
    .then((company)=>{
        res.status(200).send(company);
    }).catch(err => res.status(500).send(err));
}

/**
 * @name post
 * @description Post data to save Company on Mongo
 * @param {Request} req 
 * @param {Response} res
 * @returns {ObjectJson}
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
 * @description Post data to update Company on Mongo
 * @param {Request} req 
 * @param {Response} res
 * @returns {ObjectJson}
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
 * @returns {ObjectJson}
 */
exports.delete = (req,res)=>{
    CompanyModel.delete(req.params.id)
    .then(()=>{
        res.status(200).send('Excluído');
    }).catch(err => console.error.bind(console, `Error $(err)`));
}
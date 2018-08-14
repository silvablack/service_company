'use strict';

const CompanyRepository = require('../repository/companyRepository');

var redis = require("redis");
var client = redis.createClient('redis://redis:6379');

exports.get = (req,res,next)=>{
    client.get("allCompanies", (err, reply)=>{
        if(reply){
            console.log('cached');
            res.send(reply);
        }else{
            console.log('find db');
            CompanyRepository.getAll()
            .then((company)=>{
                client.set('allCompanies',JSON.stringify(company));
                client.expire('allCompanies',20);
                res.status(200).send(company);
            }).catch(err => res.status(500).send(err));
        }
    });
    
}

exports.getById = (req,res,next)=>{
    CompanyRepository.getById(req.params.id)
    .then((company)=>{
        res.status(200).send(company);
    }).catch(err => res.status(500).send(err));
}

exports.post = (req,res,next)=>{
    const data = req.body;
    CompanyRepository.create(data)
    .then((company)=>{
        res.status(200).send(company);
    }).catch(err => res.status(500).send(err));
}

exports.put = (req,res,next)=>{
    const data = req.body;
    CompanyRepository.update(data)
    .then((company)=>{
        res.status(201).send(company);
    }).catch(err => res.status(500).send(err));
}

exports.delete = (req,res,next)=>{
    CompanyRepository.delete(req.params.id)
    .then(()=>{
        res.status(200).send('Excluído');
    }).catch(err => console.error.bind(console, `Error $(err)`));
}
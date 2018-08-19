/**
 * @author Paulo Silva
 * @description Routes of exposure
 * @returns methods Router<get, get:id, post, put, delete>
 * @version 1.0.0
 */
 /**
  * @requires express.js
  */
 const express = require("express");

 /**
  * @constructor Express Router
  */
 const router = express.Router();
 

  /**
  * @requires Company Controller
  */
  const companyController = require('../controllers/companyController');
  const companyModel = require('../model/companyModel');
  const CompanyController = new companyController(companyModel);
  /**
   * @description Define router to METHOD HTTP/RESTFul GET/POST/PUT/DELETE
   */
  router
  .get('/',(req,res)=>{
    CompanyController.getAllFromCache()
    .then((response) => {
      res.status(response.statusCode).send(response.data);
    });
  })

  router
  .get('/:id',(req,res)=>{
    CompanyController.getById(req.params.id)
    .then((response) => {
      res.status(response.statusCode).send(response.data);
    })
  })


  router
  .post('/',(req,res)=>{
    CompanyController.post(req.body)
    .then((response) => {
      res.status(response.statusCode).send(response.data);
      
    })
  });
  router
  .put('/:id',(req,res)=>{
    CompanyController.put(req.params.id,req.body)
    .then((response) => {
      res.status(response.statusCode).send(response.data);
    })
  });
  router
  .delete('/:id',(req,res)=>{
    CompanyController.delete(req.params.id)
    .then((response) => {
      res.status(response.statusCode).send(response.data);
    })
  });

module.exports = router;

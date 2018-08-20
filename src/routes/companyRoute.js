/**
 * @author Paulo Silva
 * @description Routes of exposure
 * @returns methods Router<get, get:id, post, put, delete>
 * @version 1.0.0
 */
/**
  * @requires express.js
  */
const express = require('express');

/**
  * @constructor Express Router
  */
const router = express.Router();


/**
  * @requires Company Controller
  */
const CompanyController = require('../controllers/companyController');
const CompanyModel = require('../model/companyModel');

const companyController = new CompanyController(CompanyModel);
/**
   * @description Define router to METHOD HTTP/RESTFul GET/POST/PUT/DELETE
   */
router
  .get('/', (req, res) => {
    companyController.getAllFromCache()
      .then((response) => {
        res.status(response.statusCode).send(response.data);
      });
  });

router
  .get('/:id', (req, res) => {
    companyController.getById(req.params.id)
      .then((response) => {
        res.status(response.statusCode).send(response.data);
      });
  });


router
  .post('/', (req, res) => {
    companyController.post(req.body)
      .then((response) => {
        res.status(response.statusCode).send(response.data);
      });
  });
router
  .put('/:id', (req, res) => {
    companyController.put(req.params.id, req.body)
      .then((response) => {
        res.status(response.statusCode).send(response.data);
      });
  });
router
  .delete('/:id', (req, res) => {
    companyController.delete(req.params.id)
      .then((response) => {
        res.status(response.statusCode).send(response.data);
      });
  });

module.exports = router;

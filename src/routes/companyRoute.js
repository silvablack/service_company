/**
 * @author Paulo Silva
 * @description Routes of exposure
 * @returns methods Router<get, get:id, post, put, delete>
 * @version 1.0.0
 */

const express = require("express");
const router = express.Router();
const controller = require('../controllers/companyController');

/**
 * @description Define router to METHOD HTTP/RESTFul GET/POST/PUT/DELETE
 */
router.get('/',controller.get);
router.get('/:id',controller.getById);
router.post('/',controller.post);
router.put('/:id',controller.put);
router.delete('/:id',controller.delete);

module.exports = router;
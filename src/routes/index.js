/**
 * @author Paulo Silva
 * @description Routes Index
 * @returns methods <get>
 * @version 1.0.0
 */
'use strict';

/**
 * @requires express
 */
const express = require("express");

/**
 * @requires express.Router
 */
const router = express.Router();

/**
 * @returns Infomations on Service
 */
router.get('/',(req,res,next)=>{
    res.status(200).send({
        title: 'Company Service',
        version: '1.0.0'
    });
});

module.exports = router;
/**
 * @author Paulo Silva
 * @description Connect MongoDB and define Company Schema
 * @returns methods <get, getById, post, put, delete>
 * @version 1.0.0
 */

'use strict';

/**
 * @requires mongoose
 */
const mongoose = require('mongoose');

/**
 * @constructor Connect Mongo
 */
mongoose.connect('mongodb://company-data:27027/db_challenge',{ useNewUrlParser: true });

var Schema = mongoose.Schema;

/**
 * @description Define Schema
 */
var companySchema = new Schema({
    /**
     * @param String name
     */
    name: {
        type: String,
        required: true
    },
    /**
     * @param String mail <Validate|mail>
     */
    mail: {
        type: String,
        validate:{
            /**
             * @description General Email Regex (RFC 5322 Official Standard)
             */
            validator: (v)=>{
                return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(v)
            }
        },
        message: props => `${props.value} is not mail valid`,
    },
    /**
     * @param String cnpj
     */
    cnpj: String
});

var Company = mongoose.model('Company',companySchema);

module.exports = Company;

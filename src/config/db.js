/**
 * @author Paulo Silva
 * @description Connect MongoDB and define Company Schema
 * @returns methods <get, getById, post, put, delete>
 * @version 1.0.0
 */

/**
 * @requires mongoose
 */
const mongoose = require('mongoose');

/**
 * @constructor Connect Mongo
 */
mongoose.connect(`mongodb://${process.env.URI_DATA_COMPANY}`, { useNewUrlParser: true });
/**
 * @description Define Schema
 */
const companySchema = new mongoose.Schema({
  /**
     * @param String name
     */
  name: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 60,
  },
  /**
     * @param String mail <Validate|mail>
     */
  mail: {
    type: String,
    validate: {
      /**
             * @description Email Regex
             */
      validator: v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v),
    },
    message: props => `${props.value} is not mail valid`,
  },
  /**
     * @param String cnpj
     */
  cnpj: {
    type: String,
    minlength: 14,
    maxlength: 14,
  },

},
{
  /**
     * The versionKey is a property set on each document when first created by Mongoose
     * This keys value contains the internal revision of the document
     */
  versionKey: false,
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;

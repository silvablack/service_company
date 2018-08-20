/**
 * @requires Http Status
 */
const HttpStatus = require('http-status');
/**
* @requires Redis Data Cache
*/
const redis = require('redis');
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


class CompanyController {
  constructor(Company, cache = true) {
    /**
    * @requires Company Model
    */
    this.CompanyModel = Company;

    if (cache) {
      this.cache = cache;
      /**
      * @constructor Redis Client
      */
      this.client = redis.createClient(`redis://${process.env.URL_CACHE_COMPANY}`);
    }
  }

  /**
     * @name get
     * @description return a Promise with data of all Companies
     * and set data in cache (redis),
     * @param {Request} req
     * @param {Response} res
     * @returns {Object}[] Company
     */
  getAll() {
    return new Promise((resolve, reject) => {
      this.CompanyModel.getAll()
        .then((company) => {
          resolve(defaultResponse(company));
        }).catch(err => reject(errorResponse(err.message)));
    });
  }

  /**
     * @name getAllFromCache
     * @description Return a response with all companies from cache
     * @return Promise<Company>
     */

  getAllFromCache() {
    return new Promise((resolve, reject) => {
      this.client.get('allCompanies', (err, reply) => {
        if (reply) {
          this.cache_data = reply;
          resolve(defaultResponse(reply));
        }
      });
      this.CompanyModel.getAll()
        .then((company) => {
          this.client.set('allCompanies', JSON.stringify(company));
          this.client.expire('allCompanies', 20);
          resolve(defaultResponse(company));
        }).catch(erro => reject(errorResponse(erro.message)));
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
  getById(id) {
    return new Promise((resolve, reject) => {
      this.CompanyModel.getById(id)
        .then((company) => {
          resolve(defaultResponse(company));
        }).catch(err => reject(errorResponse(err.message)));
    });
  }

  /**
     * @name post
     * @description Send Company Object to Create Model
     * @param {Request} req
     * @param {Response} res
     * @method create
     * @returns {Object} Company
     */
  post(data) {
    return new Promise((resolve, reject) => {
      this.CompanyModel.create(data)
        .then((company) => {
          resolve(defaultResponse(company, HttpStatus.CREATED));
        }).catch(err => reject(errorResponse(err.message, HttpStatus.UNPROCESSABLE_ENTITY)));
    });
  }

  /**
     * @name put
     * @description Send Param ID and Data Company to Model Update
     * @param {Request} req
     * @param {Response} res
     * @method update
     * @returns {Object} Company
     */
  put(id, data) {
    return new Promise((resolve, reject) => {
      this.CompanyModel.update(id, data)
        .then((company) => {
          resolve(defaultResponse(company));
        }).catch(err => reject(errorResponse(err, HttpStatus.UNPROCESSABLE_ENTITY)));
    });
  }

  /**
     * @name delete
     * @description Delete Company data on Mongo
     * @param {Request} req
     * @param {Response} res
     * @method delete
     * @returns {Object} INFO JSON
     */
  delete(id) {
    return new Promise((resolve, reject) => {
      this.CompanyModel.delete(id)
        .then(() => {
          resolve(defaultResponse(null, HttpStatus.NO_CONTENT));
        }).catch(err => reject(errorResponse(err, HttpStatus.UNPROCESSABLE_ENTITY)));
    });
  }
}

module.exports = CompanyController;

/**
 * @author Paulo Silva
 * @description Company Controller Service
 * @returns methods <get, getById, post, put, delete>
 * @version 1.0.0
 */

/**
 * @requires Http Status
 */
const HttpStatus = require('http-status');
/**
* @requires Redis Data Cache
*/
const redis = require('redis');

/**
* @description Interfaces to data response
*/
const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);


class CompanyController {
  constructor(Company) {
    /**
    * @requires Company Model
    */
    this.CompanyModel = Company;
  }

  /**
     * @name get
     * @description return a Promise with data of all Companies
     * and set data in cache (redis),
     * @returns Promise CompanyController.getAll()
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
     * @return Promise CompanyController.getAllFromCache()
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
          /**
          * @constructor Redis Client
          */
          const client = redis.createClient(`redis://${process.env.URL_CACHE_COMPANY}`);
          client.set('allCompanies', JSON.stringify(company));
          client.expire('allCompanies', 20);
          resolve(defaultResponse(company));
        }).catch(erro => reject(errorResponse(erro.message)));
    });
  }


  /**
     * @name getById
     * @description Send Request to Find Model By ID
     * @method getById
     * @returns Promise CompanyController.getById(id)
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
     * @method create
     * @returns Promise CompanyController.post(, data)
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
     * @method update
     * @returns Promise CompanyController.put(id, data)
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
     * @method delete
     * @returns Https Status 204
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

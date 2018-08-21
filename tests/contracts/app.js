const CompanyModel = require('../../src/model/companyModel');

describe('Test Contract', () => {
  const defaultCompany = {
    _id: '5b74e44d6906800036631800',
    name: 'CEMAR - Companhia Elétrica',
    mail: 'cemar@cemar.com.br',
    cnpj: '05082494000114',
  };

  beforeEach((done) => {
    CompanyModel.deleteAll().then(() => {
      CompanyModel.create(defaultCompany).then(() => {
        done();
      });
    });
  });

  describe('Route /GET /company', () => {
    it('should return a list with valid schema', (done) => {
      const expectedSchema = Joi.array().items(Joi.object().keys({
        _id: Joi.string().alphanum(),
        name: Joi.string().min(10).max(60),
        mail: Joi.string().email({ minDomainsAtoms: 3 }),
        cnpj: Joi.string().min(14).max(14),
      }));
      request
        .get('/company')
        .end((err, res) => {
          Joi.assert(res.body, expectedSchema);
          done(err);
        });
    });
  });

  describe('Route /GET /company/:id', () => {
    it('should return a company valid schema', (done) => {
      const expectedSchema = Joi.object().keys({
        _id: Joi.string().alphanum(),
        name: Joi.string().min(10).max(60),
        mail: Joi.string().email({ minDomainsAtoms: 3 }),
        cnpj: Joi.string().min(14).max(14),
      });
      request
        .get(`/company/${defaultCompany._id}`)
        .end((err, res) => {
          Joi.assert(res.body, expectedSchema);
          done(err);
        });
    });
  });

  describe('Route /POST /company', () => {
    const newCompany = {
      _id: '5b74e44d6906800036631801',
      name: 'CAEMA - Companhia de Águas e Esgoto',
      mail: 'caema@caema.com.br',
      cnpj: '50960407000139',
    };

    it('should create company and check if a schema is valid', (done) => {
      const expectedSchema = Joi.object().keys({
        _id: Joi.string().alphanum(),
        name: Joi.string().min(10).max(60),
        mail: Joi.string().email({ minDomainsAtoms: 3 }),
        cnpj: Joi.string().min(14).max(14),
      });
      request
        .post('/company')
        .send(newCompany)
        .end((err, res) => {
          Joi.assert(res.body, expectedSchema);
          done(err);
        });
    });
  });

  describe('Route /PUT /company:id', () => {
    it('should update company and check if a schema is valid', (done) => {
      const name = 'CEMAR - Compania Elétrica 2';
      const expectedSchema = Joi.object().keys({
        _id: Joi.string().alphanum(),
        name: Joi.string().min(10).max(60),
        mail: Joi.string().email({ minDomainsAtoms: 3 }),
        cnpj: Joi.string().min(14).max(14),
      });
      request
        .put(`/company/${defaultCompany._id}`)
        .send({
          name,
        })
        .end((err, res) => {
          Joi.assert(res.body, expectedSchema);
          done(err);
        });
    });
  });

  describe('Route /DELETE /company:id', () => {
    it('should delete company object', (done) => {
      request
        .delete(`/company/${defaultCompany._id}`)
        .end((err, res) => {
          expect(res.status).to.be.eql(204);
          done(err);
        });
    });
  });
});

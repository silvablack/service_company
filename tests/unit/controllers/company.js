const CompanyController = require('../../../src/controllers/companyController');

describe('Controller Company', () => {
  describe('Get all Companies', () => {
    it('should return a list of companies', (done) => {
      const Company = {
        getAll: td.function(),
      };
      const expectResponse = [{
        _id: 1,
        name: 'Compania Eletrica',
        mail: 'cemar@email.com',
        cnpj: '1234572341212312',
      }];
      td.when(Company.getAll()).thenResolve(expectResponse);
      const companyController = new CompanyController(Company, false);
      companyController.getAll().then((response) => {
        expect(response.data).to.be.eql(expectResponse);
        done();
      });
    });
  });
  describe('Get by id Companies', () => {
    it('should return a company', (done) => {
      const Company = {
        getById: td.function(),
      };
      const expectResponse = [{
        _id: 1,
        name: 'Compania Eletrica',
        mail: 'cemar@email.com',
        cnpj: '1234572341212312',
      }];
      td.when(Company.getById(1)).thenResolve(expectResponse);
      const companyController = new CompanyController(Company, false);
      companyController.getById(1).then((response) => {
        expect(response.data).to.be.eql(expectResponse);
        done();
      });
    });
  });
  describe('Create Company', () => {
    it('should create a company', (done) => {
      const Company = {
        create: td.function(),
      };
      const newCompany = [{
        name: 'Compania Eletrica',
        mail: 'cemar@email.com',
        cnpj: '1234572341212312',
      }];
      const expectResponse = [{
        _id: 1,
        name: 'Compania Eletrica',
        mail: 'cemar@email.com',
        cnpj: '1234572341212312',
      }];
      td.when(Company.create(newCompany)).thenResolve(expectResponse);
      const companyController = new CompanyController(Company, false);
      companyController.post(newCompany).then((response) => {
        expect(response.data).to.be.eql(expectResponse);
        done();
      });
    });
  });
  describe('Update Company', () => {
    it('should update a company', (done) => {
      const Company = {
        update: td.function(),
      };
      const updateCompany = [{
        id: 1,
        name: 'Compania Eletrica',
      }];
      const expectResponse = [{
        _id: 1,
        name: 'Compania Eletrica',
        mail: 'cemar@email.com',
        cnpj: '1234572341212312',
      }];
      td.when(Company.update(updateCompany.id, updateCompany)).thenResolve(expectResponse);
      const companyController = new CompanyController(Company, false);
      companyController.put(updateCompany.id, updateCompany).then((response) => {
        expect(response.data).to.be.eql(expectResponse);
        done();
      });
    });
  });
  describe('Delete Company', () => {
    it('should delete a company', (done) => {
      const Company = {
        delete: td.function(),
      };
      const deleteCompany = [{
        id: 1,
      }];
      const expectResponse = {};
      td.when(Company.delete(deleteCompany.id)).thenResolve(expectResponse);
      const companyController = new CompanyController(Company, false);
      companyController.delete(deleteCompany.id).then((response) => {
        expect(response.statusCode).to.be.eql(204);
        done();
      });
    });
  });
});

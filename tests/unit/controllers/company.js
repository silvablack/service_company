const CompanyController = require('../../../src/controllers/companyController');
import HttpStatus from 'http-status';

describe('Controller Company',()=>{

    describe('Get all Companies',()=>{
        
        it('should return a list of companies', done =>{
            const Company = {
                getAll: td.function()
            };
            const expectCompany = [{
                _id: 1,
                name: 'Compania Eletrica',
                mail: 'cemar@email.com',
                cnpj: '1234572341212312'
            }];
            td.when(Company.getAll()).thenResolve(expectCompany);
            const companyController = new CompanyController(Company,false);
            companyController.get().then((response)=>{
                expect(response.data).to.be.eql(expectCompany);
                expect(response.statusCode).to.be.eql(HttpStatus.OK);
                done();
            });
                        
        });
    }); 

});
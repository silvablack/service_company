describe('Routes company',()=>{
    const CompanyModel = require('../../src/model/companyModel');
    const defaultCompany = {
        _id: '5b74e44d6906800036631800',
        name: 'CEMAR - Companhia Elétrica',
        mail: 'cemar@cemar.com.br',
        cnpj: '00011122299'
    };

    beforeEach(done=>{
        CompanyModel.deleteAll().then(()=>{
            CompanyModel.create(defaultCompany).then(()=>{
                done();
            });
        });
    });
    
    describe('Route /GET /company',()=>{
        it('should return a list company',done => {
            request
                .get('/company')
                .end((err,res)=>{
                    expect(res.body[0]._id).to.be.eql(defaultCompany._id);
                    expect(res.body[0].name).to.be.eql(defaultCompany.name);
                    expect(res.body[0].mail).to.be.eql(defaultCompany.mail);
                    expect(res.body[0].cnpj).to.be.eql(defaultCompany.cnpj);
                    expect(res.status).to.be.eql(200);
                    done(err);
                });
        })
    });

    describe('Route /GET /company/:id',()=>{
        it('should return a company object',done => {
            request
                .get('/company/'+defaultCompany._id)
                .end((err,res)=>{
                    expect(res.body._id).to.be.eql(defaultCompany._id);
                    expect(res.body.name).to.be.eql(defaultCompany.name);
                    expect(res.body.mail).to.be.eql(defaultCompany.mail);
                    expect(res.body.cnpj).to.be.eql(defaultCompany.cnpj);
                    expect(res.status).to.be.eql(200);
                    done(err);
                });
        })
    });

    describe('Route /POST /company',()=>{
        const newCompany = {
            _id: '5b74e44d6906800036631801',
            name: 'CAEMA - Companhia de Águas e Esgoto',
            mail: 'caema@caema.com.br',
            cnpj: '00011122210'
        };
        it('should create company object',done => {
            request
                .post('/company')
                .send(newCompany)
                .end((err,res)=>{
                    expect(res.body.name).to.be.eql(newCompany.name);
                    expect(res.body.mail).to.be.eql(newCompany.mail);
                    expect(res.body.cnpj).to.be.eql(newCompany.cnpj);
                    expect(res.status).to.be.eql(200);
                    done(err);
                });
        })
    });

    describe('Route /PUT /company:id',()=>{
        it('should update company object',done => {
            let name = 'CEMAR - Compania Elétrica 2';
            request
                .put('/company/'+defaultCompany._id)
                .send({
                    name: name
                })
                .end((err,res)=>{
                    expect(res.body._id).to.be.eql(defaultCompany._id);
                    expect(res.body.name).to.be.eql(name);
                    expect(res.status).to.be.eql(201);
                    done(err);
                });
        })
    });

    describe('Route /DELETE /company:id',()=>{
        it('should delete company object',done => {
            request
                .delete('/company/'+defaultCompany._id)
                .end((err,res)=>{
                    expect(res.body.delete).to.be.eql(true);
                    expect(res.status).to.be.eql(200);
                    done(err);
                });
        })
    });
});
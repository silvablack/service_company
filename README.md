# Service Company #

[API Documentation](https://documenter.getpostman.com/view/5097449/RWToPHhL)

### Description ###

+ Applied patterns of **HTTP/RESTFul**
+ Service of Company to retrieve information on companies in data storage
+ Cache is applied in route GET /company

### This API is defined in: ###

   + **Data storage:** [MongoDB](https://www.mongodb.com/)
   + **Programming Language:** [Nodejs](https://nodejs.org/en/) - [express](http://expressjs.com/pt-br/)
   + **Cache:** [Redis](https://redis.io/)

### Tests ###
+   Run command line:
   
   + run lint + test unit + test integration
        `npm run test`

   + run test unit
        `npm run test-unit`

   + run test integration
        `npm run test-integration`
   
   + run lint code revision
        `npm run lint`
   

### Access on AWS EC2 ###

+ **URL** <http://18.223.203.222:5010/>

+ **/GET** <http://18.223.203.222:5010/company>

+ **/GET** <http://18.223.203.222:5010/company/:ID>

+ **/POST** <http://18.223.203.222:5010/company> {name: string(10-60), mail: email(regex:valid:mail), cnpj: string(14)}

+ **/PUT** <http://18.223.203.222:5010/company/:COMPANY_ID> {Data: any}

+ **/DELETE** <http://18.223.203.222:5010/company/:COMPANY_ID>

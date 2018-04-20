
# raay-js

Node JS framework for micro-service applications

Salient features :

* Rest-ful routes with version-ing
* Error Handling using custom package(raay-errors.js)
* Middle-wares
* Global variable (*nf*) to access services, repositories, utilities, models, controllers without importing.
* Authentication 
* Pagination
* Logging 
* Sequelize ORM



Sample run command 


```
NODE_ENV=test|production PORT=3000 npx gulp serve
```


_Default environment is dev ( config/lib/dev.js )_
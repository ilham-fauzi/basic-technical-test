#Basic Technical Test (M. Ilkham Fauzi)

## Required
- node version : v10.8 or higher
- PostgreSQL: 12.2  

## clone
- clone this repo to your local using 
```shell
git clone git@github.com:ilham-fauzi/basic-technical-test.git
```

## Intalation
> install all package first
```shell
$ npm install --save
```
## Database migration
> migrate database first
```shell
$ npx sequelize-cli db:migrate
```

## Start application
```shell
$ npm run start
```

## Access API documentation
> access your localhost <a href="http://localhost:3000/documentation" target="_blank">`http://localhost:3000/documentation`</a>

## unit testing
> run unit testing by console
```shell
$ npm run test
```

## sample env
```shell
NODE_ENV=development
APP_PORT=3000

DB_CONNECTION_STRING=postgres://user:password@localhost:5432/database-name
DB_MODELS_PATH=sequelize/models
```




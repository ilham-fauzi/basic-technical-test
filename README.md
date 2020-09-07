#Basic Technical Test (M. Ilkham Fauzi)

## Required
```shell
- node version : v10.8 or higher
- npm version: 6.14.8
- PostgreSQL: 12.2  
```

## clone
- clone this repo to your local using 
```shell
git clone git@github.com:ilham-fauzi/basic-technical-test.git
$ cd basic-technical-test
```
## create .env file from existing .env.example file
```shell
$ cp .env.example .env
```

## copy and paste this code to .env file
```shell
NODE_ENV=development
APP_PORT=3000

DB_CONNECTION_STRING=postgres://user:password@localhost:5432/database-name
DB_MODELS_PATH=sequelize/models
```

## Intalation
> install all package first
```shell
$ npm install
```

## Database migration
> migrate database first
```shell
$ npm run migrate
```

## Start application
```shell
$ npm run start
```

## API documentation URL 
> access your localhost <a href="http://localhost:3000/documentation" target="_blank">`http://localhost:3000/documentation`</a>

## unit testing
> run unit testing by console
```shell
$ npm run test
```




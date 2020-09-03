"use strict";

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);

const dbConnectionString = process.env.DB_CONNECTION_STRING;
const db = {};
const options = {
    dialect: "mysql",
    logging: process.env.NODE_ENV === 'production' ? false : console.log, // tslint:disable-line
    pool: {
        min: 0,
        max: 5,
        idle: 10000,
        acquire: 20000,
    },
};
const sequelize = new Sequelize(dbConnectionString, options);

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
    })
    .forEach(file => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

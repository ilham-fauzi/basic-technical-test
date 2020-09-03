
import * as fs from 'fs';
import * as path from 'path';
import { Options, Sequelize } from 'sequelize';
import { Injectable } from '@nestjs/common';

interface IDbInput {
    connection_string: string;
    models_path: string;
}

type instance = any | null;

const options: Options = {
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'production' ? false : console.log, // tslint:disable-line
    pool: {
        min: 0,
        max: 5,
        idle: 10000,
        acquire: 20000,
    },
};

let modelsInitialized: boolean = false;
let models: instance = null;

@Injectable()
export class DataBaseService {
    public static initialize(data: IDbInput) {
        models = {};
        const sequelize = new Sequelize(data.connection_string, options);

        const modelsDir = path.join(__dirname, '../../..', data.models_path);
        fs.readdirSync(modelsDir)
            .filter((file) => {
                const fileExtension: string = file.slice(-3);
                const isEligible: boolean = (fileExtension === '.js' || fileExtension === '.ts');
                return (file.indexOf('.') !== 0) && isEligible;
            })
            .forEach((file) => {
                const model = sequelize.import(path.join(modelsDir, file));
                models[model.name] = model;
            });

        Object.keys(models).forEach((modelName) => {
            if (models[modelName].associate) {
                models[modelName].associate(models);
            }
        });

        models.ORMProvider = Sequelize;
        models.context = sequelize;
        modelsInitialized = true;
    }

    public static getInstance() {
        if (!modelsInitialized) {
            throw new Error('SQL Not initialize');
        }
        return models;
    }

    public static async startTransaction() {
        if (!modelsInitialized) {
            throw new Error('SQL Not initialize');
        }
        models.db_transaction = await models.context.transaction({
            isolationLevel: models.ORMProvider.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
        });
    }

    public static async endTransaction() {
        models.db_transaction = null;
    }

    public static async getTransaction() {
        return models.db_transaction;
    }

    public static async commit() {
        if (models && models.db_transaction) {
            await models.db_transaction.commit();
            models.db_transaction = null;
        }
    }

    public static async rollback() {
        if (models && models.db_transaction) {
            await models.db_transaction.rollback();
            models.db_transaction = null;
        }
    }

    public static async closeContext() {
        let result = null;

        if (models && models.context) {
            console.info('Closing - DBContext'); // tslint:disable-line
            result = await models.context.close().catch((err: Error) => {
                console.error(`Error Closing DBContext: ${err.stack}`); // tslint:disable-line
            });
            console.info('Closed - DBContext'); // tslint:disable-line
        }

        models = null;
        modelsInitialized = false;
        return result;
    }
}

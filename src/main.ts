import { NestFactory } from '@nestjs/core';
import { MainModule } from './ui/MainModule';
import * as env from 'dotenv';

import { DataBaseService } from './infra/services/DataBaseService';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    env.config();

    await initDatabases();

    const app = await NestFactory.create(MainModule);
    const option =  new DocumentBuilder()
        .setTitle('API documentation')
        .setDescription('This is the basic technical test documentation for the API test "kitabisa"')
        .setVersion('1.0.0')
        .build();

    const document = SwaggerModule.createDocument(app, option);
    SwaggerModule.setup('documentation', app, document);
    await app.listen(process.env.APP_PORT);
}

async function initDatabases() {
    if (process.env.DB_CONNECTION_STRING
        && process.env.DB_MODELS_PATH
    ) {
        DataBaseService.initialize({
            connection_string: process.env.DB_CONNECTION_STRING,
            models_path: process.env.DB_MODELS_PATH,
        });
    }
}

bootstrap();

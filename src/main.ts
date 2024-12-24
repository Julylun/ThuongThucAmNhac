import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser'
import * as YAML from 'yamljs'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {

    //Create nestjs app module
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        rawBody: true,
    });


    //Alow front-end use CORS and enable cookieParser
    app.enableCors();
    app.use(cookieParser());

    //Set api/version for endpoint route
    app.setGlobalPrefix('api')
    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1'
    })

    //Generate API document for Ly cute de huong
    const swaggerConfig = new DocumentBuilder()
    .setTitle("API TTAN Documentation")
    .setDescription("This is a API documentation for Thuong Thuc Am Nhac back-end server. Please read this before using Thuong Thuc Am Nhac API from back-end developer :). Good luck!")
    .setVersion('1.0')
    .addTag('User')
    .addServer('http://localhost:27075','Local server')
    .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
    },'access-token')
    .build();
    const swaggerDocs = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('/docs/api',app,swaggerDocs, {
        customCss: '.swagger-ui .topbar {display:none}',
        customJs: 'src/api_docs/swagger-plugins/fetch-plugin.js'
    })

    //Direct static website to /public
    app.useStaticAssets(join(__dirname, 'ThuongThucAmNhac/public'));
    await app.listen(27075);
}
bootstrap();

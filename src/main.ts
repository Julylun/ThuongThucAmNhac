import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        rawBody: true,
    });
    app.enableCors()    // Thiết lập thư mục chứa file tĩnh
    app.use(cookieParser())
    app.useStaticAssets(join(__dirname, 'ThuongThucAmNhac/public'));
    await app.listen(27075);
}
bootstrap();

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './modules/person/person.module'
import { CommonModule } from './common/common.module';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'), // Đường dẫn đến thư mục `public`
        }),
        PersonModule,
        CommonModule,
        ConfigModule,
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}


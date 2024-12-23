import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './modules/person/person.module'
import { CommonModule } from './common/common.module';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './modules/person/person.entity';
import { AccessToken } from './modules/auth/accesstoken/accesstoken.entity';
import { PlaylistModule } from './modules/playlist/playlist.module';
import { Playlist } from './modules/playlist/playlist.entity';
import { SongModule } from './modules/song/song.module';
import { Song } from './modules/song/entity/song.entity';
import { RefreshToken } from './modules/auth/refreshtoken/entity/refreshtoken.entity';
import { AccesstokenModule } from './modules/auth/accesstoken/accesstoken.module';
import { RefreshtokenModule } from './modules/auth/refreshtoken/refreshtoken.module';
import { JwtMiddleWare } from './modules/auth/accesstoken/jwt.middleware';
import { HashModule } from './modules/auth/hash/hash.module';
import * as fs from 'fs';
import { GmailController } from './modules/gmail/gmail.controller';
import { GmailService } from './modules/gmail/gmail.service';
import { GmailModule } from './modules/gmail/gmail.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { SearchModule } from './modules/search/search.module';
import { OtpCode } from './modules/auth/otp-code/entity/otp-code.entity';
import { OtpCodeModule } from './modules/auth/otp-code/otp-code.module';
import { RegisterModule } from './modules/auth/register/register.module';

let configurationData = null;
try {
    configurationData = JSON.parse(fs.readFileSync('./src/config/system.config.json').toString());
    console.log("[app.module][MY-CUSTOM-PRELOADING]: Loading configuration file...");
    // console.log(configurationData)
} catch (error) {
    console.log("[app.module][MY-CUSTOM-PRELOADING]: An error occures when loading configuration file");
    console.error(error);
}

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: configurationData.database.type,
            host: configurationData.database.host,
            port: configurationData.database.port,
            username: configurationData.database.username,
            password: configurationData.database.password,
            database: configurationData.database.database,
            entities: [Person, AccessToken, RefreshToken, Playlist, Song, OtpCode],
            migrations: ['src/migration/**/*.ts'],
            synchronize: false, // Đặt thành false để tránh đồng bộ hóa tự động khi chạy app
            logging: true,
        }),

        // TypeOrmModule.forFeature([Person, Artist, AccessToken, RefreshToken, Playlist, Song]),
        // TypeOrmModule.forRoot(AppDataSource.options),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'), // Đường dẫn đến thư mục `public`
        }),
        PersonModule,
        CommonModule,
        ConfigModule,
        AuthModule,
        PlaylistModule,
        SongModule,
        RefreshtokenModule,
        AccesstokenModule,
        HashModule,
        GmailModule,
        SearchModule,
        OtpCodeModule,
        RegisterModule
    ],
    controllers: [AppController],
    providers: [AppService, JwtMiddleWare],
})
export class AppModule {

    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(JwtMiddleWare)
            .forRoutes('api/song/upload');
    }
}


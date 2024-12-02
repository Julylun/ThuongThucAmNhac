import { MiddlewareConsumer, Module } from '@nestjs/common';
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

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            database: 'TTAN_DB',
            entities: [Person, AccessToken, RefreshToken, Playlist, Song],
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
    ],
    controllers: [AppController],
    providers: [AppService,JwtMiddleWare],
})
export class AppModule { 

    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(JwtMiddleWare)
            .forRoutes('api/song/upload');
    }
}


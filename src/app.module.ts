import { Module } from '@nestjs/common';
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
import { ArtistModule } from './modules/artist/artist.module';
import { Song } from './modules/song/song.entity';
import { Artist } from './modules/artist/artist.entity';
import { AppDataSource } from './data-source';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            database: 'TTAN_DB',
            entities: [Person, AccessToken, Playlist, Song, Artist],
            migrations: ['src/migration/**/*.ts'],
            synchronize: false, // Đặt thành false để tránh đồng bộ hóa tự động khi chạy app
            logging: true,
        }),
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
        ArtistModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }


import { DataSource } from "typeorm";
import { AccessToken } from "./modules/auth/accesstoken/accesstoken.entity";
import { Person } from "./modules/person/person.entity";
import { Playlist } from "./modules/playlist/playlist.entity";
import { Song } from "./modules/song/entity/song.entity";
import { Artist } from "./modules/artist/artist.entity";

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  database: 'TTAN_DB',
  entities: [Person, Playlist, Song, AccessToken,Artist],
  migrations: ['src/migration/**/*.ts'],
  synchronize: false,
  logging: true,
});

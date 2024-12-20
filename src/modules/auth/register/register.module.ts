import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/modules/person/person.entity';
import { Artist } from 'src/modules/artist/artist.entity';
import { PersonService } from 'src/modules/person/person.service';

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  controllers: [RegisterController],
  providers: [RegisterService,PersonService]
})
export class RegisterModule {}

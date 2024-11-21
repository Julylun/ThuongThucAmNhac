import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/modules/person/person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  controllers: [RegisterController],
  providers: [RegisterService]
})
export class RegisterModule {}

import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { AccesstokenModule } from './accesstoken/accesstoken.module';
import { RefreshtokenModule } from './refreshtoken/refreshtoken.module';
import { HashController } from './hash/hash.controller';
import { HashModule } from './hash/hash.module';
import { AdminService } from './admin/admin.service';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [LoginModule, RegisterModule, AccesstokenModule, RefreshtokenModule, HashModule, AdminModule],
  exports: [LoginModule],
  providers: [AdminService],
  controllers: [HashController],
})
export class AuthModule {}

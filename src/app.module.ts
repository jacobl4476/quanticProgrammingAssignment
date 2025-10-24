import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LeadsController } from './leads/leads.controller';
import { LeadsService } from './leads/leads.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController, LeadsController],
  providers: [AppService, LeadsService],
})
export class AppModule {}

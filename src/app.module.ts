import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LeadsController } from './leads/leads.controller';
import { LeadsService } from './leads/leads.service';
import { AccountsController } from './accounts/accounts.controller';
import { AccountsService } from './accounts/accounts.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController, LeadsController, AccountsController],
  providers: [AppService, LeadsService, AccountsService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LeadsController } from './leads/leads.controller';
import { LeadsService } from './leads/leads.service';
import { AccountsController } from './accounts/accounts.controller';
import { AccountsService } from './accounts/accounts.service';
import { ActivitiesController} from './activities/activities.controller';
import { ActivitiesService } from './activities/activities.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController, LeadsController, AccountsController, ActivitiesController],
  providers: [AppService, LeadsService, AccountsService, ActivitiesService],
})
export class AppModule {}

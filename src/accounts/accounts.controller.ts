import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Delete,
    Patch,
    Request,
    UseGuards
} from '@nestjs/common';
import { ValidationPipe } from '../validation.pipe'
import { AccountsService } from './accounts.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService, ) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post()
  create(@Request() req, @Body(new ValidationPipe()) accountDto: {owner_id: string, name: string, industry: string},) {
    return this.accountsService.create(accountDto, req);
  }

  @UseGuards(AuthGuard)
  @Get()
  read(@Request() req) {
    return this.accountsService.read(req);
  }
  @UseGuards(AuthGuard)
  @Patch()
  update(@Request() req, @Body(new ValidationPipe()) accountDto: {id: string, name?: string, industry?: string},) {
    return this.accountsService.update(accountDto, req);
  }

  @UseGuards(AuthGuard)
  @Delete()
  delete(@Request() req, @Body(new ValidationPipe()) accountDto: {id: string},) {
    return this.accountsService.delete(accountDto.id, req);
  }
}
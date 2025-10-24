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
import { LeadsService } from './leads.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('leads')
export class LeadsController {
  constructor(private leadsService: LeadsService, ) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post()
  create(@Request() req, @Body(new ValidationPipe()) leadDto: {name: string, company: string, status: string},) {
    return this.leadsService.create(leadDto.name, leadDto.company, leadDto.status, req);
  }

  @UseGuards(AuthGuard)
  @Get()
  read(@Request() req) {
    return this.leadsService.read(req);
  }
  @UseGuards(AuthGuard)
  @Patch()
  update(@Request() req, @Body(new ValidationPipe()) leadDto: {id: string, status: string},) {
    return this.leadsService.update(leadDto.id, leadDto.status, req);
  }

  @UseGuards(AuthGuard)
  @Delete()
  delete(@Request() req, @Body(new ValidationPipe()) leadDto: {id: string},) {
    return this.leadsService.delete(leadDto.id, req);
  }
}
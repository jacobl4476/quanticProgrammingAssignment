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
import { ActivitiesService } from './activities.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('accounts/*id/activities')
export class ActivitiesController {
  constructor(private ActivitiesService: ActivitiesService, ) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post()
  create(@Request() req, @Body(new ValidationPipe()) accountDto: {type: string, notes: string, next_follow_up?: string},) {
    return this.ActivitiesService.create(accountDto, req);
  }

  @UseGuards(AuthGuard)
  @Get()
  read(@Request() req) {
    return this.ActivitiesService.read(req);
  }
  @UseGuards(AuthGuard)
  @Patch()
  update(@Request() req, @Body(new ValidationPipe()) accountDto: {id: string, type?: string, notes?: string, next_follow_up?: string},) {
    return this.ActivitiesService.update(accountDto, req);
  }

  @UseGuards(AuthGuard)
  @Delete()
  delete(@Request() req, @Body(new ValidationPipe()) accountDto: {id: string},) {
    return this.ActivitiesService.delete(accountDto.id, req);
  }
}
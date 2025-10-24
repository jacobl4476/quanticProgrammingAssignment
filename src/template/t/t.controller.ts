// import {
//     Body,
//     Controller,
//     Get,
//     HttpCode,
//     HttpStatus,
//     Post,
//     Request,
//     UseGuards
// } from '@nestjs/common';
// import { ValidationPipe } from '../validation.pipe'
// import { LeadsService } from './leads.service';
// @Controller('leads')
// export class AuthController {
//   constructor(private leadsService: LeadsService) {}

//   @HttpCode(HttpStatus.OK)
//   @Post('create')
//   create(@Body(new ValidationPipe()) objDto: objDto,) {
//     return this.leadsService.fun();
//   }
//   @Post('read')
//   read(@Body(new ValidationPipe()) objDto: objDto,) {
//     return this.leadsService.fun();
//   }
//   @Post('update')
//   update(@Body(new ValidationPipe()) objDto: objDto,) {
//     return this.leadsService.fun();
//   }
//   @Post('delete')
//   delete(@Body(new ValidationPipe()) objDto: objDto,) {
//     return this.leadsService.fun();
//   }
// }
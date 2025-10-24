import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { IsString } from 'class-validator'
import { ValidationPipe } from '../validation.pipe'
enum Roles {
    manager = "manager",
    rep = "rep"
}
class SignInDto {
    @IsString()
    email: string;

    @IsString()
    password: string;
  }

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body(new ValidationPipe()) signInDto: SignInDto,) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body() signUpDto: {email: string, password: string, role: Roles}) {
    return this.authService.signUp(signUpDto.email, signUpDto.password, signUpDto.role)
  }
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log(req)
    return req.user
  }
}

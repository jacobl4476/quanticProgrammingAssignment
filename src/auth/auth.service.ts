
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
const saltRounds = 10;

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async signUp(email: string, pass: string, role: string): Promise<any> {
    const hashed = await bcrypt.hash(pass, saltRounds)
    const user = await this.usersService.createOne(email, pass, hashed, role)
    return user ? "Success, you can now sign in" : "Please use a password that has atleast one uppercase letter and one special character"
  }

  async signIn(email: string, pass: string): Promise<{ access_token: string } | string> {
    const user = await this.usersService.findOne(email);
    const errorMsg = "Incorrect Credentials, Try Again"
    console.log(user, pass.trim())
    if(!user){
        return errorMsg
    
    }
    const match = await bcrypt.compare(pass.trim(), user.password_hash)
    console.log(match, user.password_hash)
    if (!match) {
        return errorMsg
    }    
    
    const payload = { sub: user.id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };    
  }
}

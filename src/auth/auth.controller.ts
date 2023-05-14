import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponse } from 'src/users/users.response';
import { AuthLoginDto } from './dto/auth-login.dto';
import { Response } from 'express';
import { LoginResponse } from './responses/login.response';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({
    status: 201,
    description: 'User record',
    type: UserResponse,
  })
  @Post('/register')
  register(@Body() body: CreateUserDto) {
    return this.authService.register(body);
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'Token for user',
    type: LoginResponse,
  })
  @Post('/login')
  async login(@Body() body: AuthLoginDto, @Res() res: Response) {
    const jwtData = await this.authService.login(body.email, body.password);
    return res.json({ id: jwtData.id, token: jwtData.token });
  }
}

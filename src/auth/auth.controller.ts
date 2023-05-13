import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponse } from 'src/users/users.response';
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
}

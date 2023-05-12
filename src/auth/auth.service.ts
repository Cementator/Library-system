import { ConflictException, Injectable } from '@nestjs/common';
import { IUser } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  async register(userData: IUser) {
    const isExistingUser = await this.userService.findOne({
      where: { email: userData.email },
    });
    if (isExistingUser) {
      throw new ConflictException('Account with this email already exists');
    }
    return 'This action adds a new auth';
  }
}

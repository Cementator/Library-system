import { ConflictException, Injectable } from '@nestjs/common';
import { IUser, User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { DeepPartial } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  async register(userData: IUser): Promise<DeepPartial<User>> {
    const isExistingUser = await this.userService.findOne({
      where: { email: userData.email },
    });
    if (isExistingUser) {
      throw new ConflictException('Account with this email already exists');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.userService.create(userData);
    console.log(user);
    return user;
  }
}

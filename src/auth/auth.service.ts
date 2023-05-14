import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IUser, User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { DeepPartial } from 'typeorm';
import { IAuth } from './interfaces/auth.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * @description Register user logic
   * @param userData
   * @returns User entity without a password
   */
  async register(userData: IUser): Promise<DeepPartial<User>> {
    const isExistingUser = await this.userService.findOne({
      where: { email: userData.email },
    });
    if (isExistingUser) {
      throw new ConflictException('Account with this email already exists');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.userService.create(userData);
    return user;
  }

  /**
   * @description Login user logic
   * @param email
   * @param submitedPass
   * @returns User id and jwt token for a user
   */
  async login(email: string, submitedPass: string): Promise<IAuth> {
    const user = await this.userService.findOne({
      select: { id: true, password: true, email: true },
      where: { email: email },
    });
    if (!user) {
      throw new NotFoundException("User with this email doesn't exist.");
    }
    const validPassword = await bcrypt.compare(submitedPass, user.password);
    if (!validPassword) {
      throw new UnauthorizedException('Invalid credentials.');
    }
    const jwtToken = await this.getSignedJwtToken(user);
    return { id: user.id, token: jwtToken };
  }

  /**
   * @description Get jwt token
   * @param user
   * @returns User entity without a password
   */
  async getSignedJwtToken(user: User): Promise<string> {
    const payload = { email: user.email, id: user.id };
    return await this.jwtService.signAsync(payload);
  }
}

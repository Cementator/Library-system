import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeepPartial, Repository } from 'typeorm';
import { FindParams } from 'src/utils/findParams';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  /**
   * @description Create User entity
   * @param userData
   * @returns User entity
   */
  async create(userData: DeepPartial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return await this.userRepository.save(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  /**
   * @description Find User entity
   * @param where
   * @returns User entity
   */
  async findOne({
    select,
    where,
    relations,
  }: FindParams<User>): Promise<User | null> {
    return await this.userRepository.findOne({ select, where, relations });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

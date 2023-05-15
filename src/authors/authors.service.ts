import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { FindParams } from 'src/utils/findParams';
import { Author } from './entities/author.entity';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author) private authorRepository: Repository<Author>,
  ) {}
  /**
   * @description Create Author entity
   * @param authorData
   * @returns Author entity
   */
  async create(authorData: DeepPartial<Author>): Promise<Author> {
    const author = this.authorRepository.create(authorData);
    return await this.authorRepository.save(author);
  }

  findAll() {
    return `This action returns all authors`;
  }

  /**
   * @description Find Author entity
   * @param where
   * @returns Author entity
   */
  async findOne({
    select,
    where,
    relations,
  }: FindParams<Author>): Promise<Author | null> {
    return await this.authorRepository.findOne({ select, where, relations });
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return `This action updates a #${id} author`;
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }
}

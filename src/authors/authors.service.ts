import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { FindParams } from 'src/utils/findParams';
import { Author } from './entities/author.entity';
import { DeepPartial, ILike, Repository } from 'typeorm';
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

  /**
   * @description Find all Author entities
   * @param where
   * @returns Author entity
   */
  async findAll({
    select,
    where,
    relations,
    skip,
    take,
  }: FindParams<Author>): Promise<Author[] | null> {
    return await this.authorRepository.find({
      select,
      where,
      relations,
      skip,
      take,
    });
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

  /**
   * @description Find all Author entities
   * @param where
   * @returns Author entity
   */
  async searchAndFind(
    page: number,
    limit: number,
    search?: string,
  ): Promise<Author[]> {
    const skip = (page - 1) * limit; // Calculate the number of items to skip
    let where;

    if (search) {
      where = {
        name: ILike(`%${search}%`), // Case-insensitive search
      };
    }

    return await this.findAll({
      where,
      relations: { books: true },
      skip,
      take: limit, // Set the maximum number of items to retrieve
    });
  }
}

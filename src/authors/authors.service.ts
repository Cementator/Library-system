import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { FindParams } from 'src/utils/findParams';
import { Author } from './entities/author.entity';
import {
  DeepPartial,
  DeleteResult,
  FindOptionsWhere,
  ILike,
  Repository,
} from 'typeorm';
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
   * @returns Author entities
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
    const author = await this.authorRepository.findOne({
      select,
      where,
      relations,
    });
    return author;
  }

  /**
   * @description Update Author entity by id
   * @param id
   * @param updateAuthorDto
   * @returns Author entity
   */
  async update(id: string, updateAuthorDto: UpdateAuthorDto) {
    const author = await this.findOne({ where: { id } });
    if (!author) {
      throw new NotFoundException('Author not found.');
    }
    author.name = updateAuthorDto.name;
    return await this.authorRepository.save(author);
  }

  /**
   * @description Update Author entity by id
   * @param id
   * @returns Author entity
   */
  async remove(id: string): Promise<DeleteResult> {
    return await this.authorRepository.delete(id);
  }

  /**
   * @description Find all Author entities with search and paginate them
   * @param page
   * @param limit
   * @param search
   * @returns Author entities
   */
  async searchAndFind(
    page: number,
    limit: number,
    search?: string,
  ): Promise<Author[]> {
    const skip = (page - 1) * limit; // Calculate the number of items to skip
    let where: FindOptionsWhere<Author>;

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

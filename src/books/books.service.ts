import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeepPartial,
  DeleteResult,
  FindOptionsWhere,
  ILike,
  Repository,
} from 'typeorm';
import { Book } from './entities/book.entity';
import { AuthorsService } from 'src/authors/authors.service';
import { FindParams } from 'src/utils/findParams';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private booksRepository: Repository<Book>,
    private readonly authorService: AuthorsService,
  ) {}
  /**
   * @description Create Book entity
   * @param bookData
   * @returns Book entity
   */
  async create(bookData: DeepPartial<Book>): Promise<Book> {
    const book = this.booksRepository.create(bookData);
    return await this.booksRepository.save(book);
  }

  /**
   * @description Find all Book entities
   * @param where
   * @returns Book entities
   */
  async findAll({
    select,
    where,
    relations,
    skip,
    take,
  }: FindParams<Book>): Promise<Book[] | null> {
    return await this.booksRepository.find({
      select,
      where,
      relations,
      skip,
      take,
    });
  }

  /**
   * @description Find Book entity
   * @param where
   * @returns Book entity
   */
  async findOne({
    select,
    where,
    relations,
  }: FindParams<Book>): Promise<Book | null> {
    const book = await this.booksRepository.findOne({
      select,
      where,
      relations,
    });
    return book;
  }

  /**
   * @description Update Book entity by id
   * @param id
   * @param updateBookDto
   * @returns Book entity
   */
  async update(id: string, updateBookDto: UpdateBookDto) {
    const book = await this.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException('Book not found.');
    }
    book.hardCopies = updateBookDto.hardCopies;
    book.title = updateBookDto.title;
    return await this.booksRepository.save(book);
  }

  /**
   * @description Delete Book entity by id
   * @param id
   * @returns Delete result
   */
  async remove(id: string): Promise<DeleteResult> {
    return await this.booksRepository.delete(id);
  }

  /**
   * @description Create Book entity and author if he doesnt exist
   * @param bookData
   * @returns Book entity
   */

  async createBookAndAuthor(bookData: CreateBookDto): Promise<Book> {
    const existingBook = await this.findOne({
      where: { title: bookData.title },
    });
    if (existingBook) {
      throw new ConflictException(
        'Book with this title is already in the database.',
      );
    }
    let author = await this.authorService.findOne({
      where: { name: bookData.author },
    });

    if (!author) {
      author = await this.authorService.create({
        name: bookData.author,
      });
    }
    const bookProperties: DeepPartial<Book> = {
      title: bookData.title,
      hardCopies: bookData.hardCopies,
      author: author,
    };
    const book = await this.create(bookProperties);
    return book;
  }

  /**
   * @description Find all Book entities with search and paginate them
   * @param page
   * @param limit
   * @param search
   * @returns Book entities
   */
  async searchAndFind(
    page: number,
    limit: number,
    search?: string,
  ): Promise<Book[]> {
    const skip = (page - 1) * limit; // Calculate the number of items to skip
    let where: FindOptionsWhere<Book>;

    if (search) {
      where = {
        title: ILike(`%${search}%`), // Case-insensitive search
      };
    }

    return await this.findAll({
      where,
      relations: { author: true },
      skip,
      take: limit, // Set the maximum number of items to retrieve
    });
  }
}

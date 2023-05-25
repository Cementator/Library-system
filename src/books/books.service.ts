import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
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

  findAll() {
    return `This action returns all books`;
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

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
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
}

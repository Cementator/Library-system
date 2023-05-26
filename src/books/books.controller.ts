import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookResponse, BooksResponse } from './responses/book.response';
import { BookParams } from './dto/book-params.dto';
import { FindBooksQueryParams } from './dto/find-books.dto';
import { DeleteResponse } from 'src/utils/delete-result';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiOperation({ summary: 'Add new book' })
  @ApiResponse({
    status: 201,
    description: 'Book record',
    type: BookResponse,
  })
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.createBookAndAuthor(createBookDto);
  }

  @ApiOperation({ summary: 'Get books' })
  @ApiResponse({
    status: 200,
    description: 'Array of book records',
    type: BooksResponse,
  })
  @Get()
  findAll(@Query() query: FindBooksQueryParams) {
    const { page, limit, search } = query;
    return this.booksService.searchAndFind(page, limit, search);
  }

  @ApiOperation({ summary: 'Get book by id' })
  @ApiResponse({
    status: 201,
    description: 'Book record',
    type: BookResponse,
  })
  @Get(':bookId')
  findOne(@Param() { bookId }: BookParams) {
    return this.booksService.findOne({
      where: { id: bookId },
      relations: { author: true },
    });
  }

  @ApiOperation({ summary: 'Update a book' })
  @ApiResponse({
    status: 200,
    description: 'Update a book',
    type: BookResponse,
  })
  @Patch(':bookId')
  update(
    @Param() { bookId }: BookParams,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.booksService.update(bookId, updateBookDto);
  }

  @ApiOperation({ summary: 'Delete a book' })
  @ApiResponse({
    status: 200,
    description: 'Delete a abook',
    type: DeleteResponse,
  })
  @Delete(':bookId')
  remove(@Param() { bookId }: BookParams) {
    return this.booksService.remove(bookId);
  }
}

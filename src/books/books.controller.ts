import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookResponse } from './responses/book.response';
import { BookParams } from './dto/book-params.dto';

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

  @Get()
  findAll() {
    return this.booksService.findAll();
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}

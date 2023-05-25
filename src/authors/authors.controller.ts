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
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthorResponse, AuthorsResponse } from './responses/author.response';
import { FindAuthorsQueryParams } from './dto/find-authors.dto';
import { DeleteResponse } from 'src/utils/delete-result';
import { AuthorParams } from './dto/author-params.dto';

@ApiTags('Authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @ApiOperation({ summary: 'Add new author' })
  @ApiResponse({
    status: 201,
    description: 'Author record',
    type: AuthorResponse,
  })
  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @ApiOperation({ summary: 'Get authors' })
  @ApiResponse({
    status: 200,
    description: 'Array of author records',
    type: AuthorsResponse,
  })
  @Get()
  findAll(@Query() query: FindAuthorsQueryParams) {
    const { page, limit, search } = query;
    return this.authorsService.searchAndFind(page, limit, search);
  }

  @ApiOperation({ summary: 'Get author by id' })
  @ApiResponse({
    status: 200,
    description: 'Author record',
    type: AuthorResponse,
  })
  @Get(':authorId')
  findOne(@Param() { authorId }: AuthorParams) {
    return this.authorsService.findOne({
      where: { id: authorId },
      relations: { books: true },
    });
  }

  @ApiOperation({ summary: 'Update an author' })
  @ApiResponse({
    status: 200,
    description: 'Update an author',
    type: AuthorResponse,
  })
  @Patch(':authorId')
  update(
    @Param() { authorId }: AuthorParams,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {
    return this.authorsService.update(authorId, updateAuthorDto);
  }

  @ApiOperation({ summary: 'Delete an author' })
  @ApiResponse({
    status: 200,
    description: 'Delete an author',
    type: DeleteResponse,
  })
  @Delete(':authorId')
  remove(@Param() { authorId }: AuthorParams) {
    return this.authorsService.remove(authorId);
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { AuthorResponse } from 'src/authors/responses/author.response';

export class BookResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  hardCopies: string;

  @ApiProperty()
  availableCopies: string;

  @ApiProperty({ type: () => AuthorResponse })
  author: AuthorResponse;
}

export class BooksResponse {
  @ApiProperty({ type: [BookResponse] })
  books: BookResponse[];
}

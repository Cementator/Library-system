import { ApiProperty } from '@nestjs/swagger';
import { BookResponse } from 'src/books/responses/book.response';

export class AuthorResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: () => [BookResponse] })
  books: BookResponse[];
}

export class AuthorsResponse {
  @ApiProperty({ type: [AuthorResponse] })
  authors: AuthorResponse[];
}

import { ApiProperty } from '@nestjs/swagger';

export class AuthorResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}

export class AuthorsResponse {
  @ApiProperty({ type: [AuthorResponse] })
  authors: AuthorResponse[];
}

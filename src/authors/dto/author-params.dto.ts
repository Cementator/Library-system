import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class AuthorParams {
  @ApiProperty()
  @IsUUID()
  authorId: string;
}

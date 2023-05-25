import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class BookParams {
  @ApiProperty()
  @IsUUID()
  bookId: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class DeleteResponse {
  @ApiProperty()
  raw: string[];

  @ApiProperty()
  affected: number;
}

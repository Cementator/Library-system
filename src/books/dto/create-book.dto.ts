import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, Min, Max } from 'class-validator';

export class CreateBookDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt({ message: 'Hard copies must be an integer.' })
  @Min(1, { message: 'Hard copies must be greater than 0.' })
  @Max(100, { message: 'Hard copies must be at most 100.' })
  hardCopies: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  author: string;
}

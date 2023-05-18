import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FindAuthorsQueryParams {
  @ApiProperty({ required: true })
  @IsString()
  page?: number;

  @ApiProperty({ required: true })
  @IsString()
  limit?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search?: string;
}

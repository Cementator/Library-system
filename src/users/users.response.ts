import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  email: string;
}

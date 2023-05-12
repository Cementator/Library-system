import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  Matches,
} from 'class-validator';
import { UserRoles } from '../enums/user-roles.enum';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(UserRoles)
  role: UserRoles;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(
    /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
    {
      message:
        'Password should contain 8 charactes, one capital letter, one number and one non alphabetic sign (!, /, + etc.)',
    },
  )
  @IsString()
  password: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsEnum(Roles)
  @IsNotEmpty()
  readonly rol: Roles;
}

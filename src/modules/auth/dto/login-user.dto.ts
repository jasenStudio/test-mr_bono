import { isEmail } from './../../../../node_modules/@types/validator/index.d';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDTO {
  @ApiProperty({
    required: true,
    type: String,
    example: 'test@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}

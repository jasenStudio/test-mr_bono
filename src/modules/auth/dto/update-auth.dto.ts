import { PartialType } from '@nestjs/mapped-types';
import { LoginUserDTO } from './login-user.dto';

export class UpdateAuthDto extends PartialType(LoginUserDTO) {}

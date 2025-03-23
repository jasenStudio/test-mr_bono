import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDTO } from './dto/login-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private __prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}
  async login(loginUserDTO: LoginUserDTO) {
    try {
      const userExists = await this.__prismaService.user.findUnique({
        where: {
          email: loginUserDTO.email,
        },
      });

      if (!userExists) {
        throw new NotFoundException('Credenciales Invalidas');
      }

      const payload = {
        email: userExists.email,
        id: userExists.id,
        rol: userExists.rol,
      };

      return {
        ok: true,
        user: userExists,
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw error;
    }
  }
}

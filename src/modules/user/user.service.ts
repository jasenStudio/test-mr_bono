import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private __prismaService: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const { email, ...rest } = createUserDto;

    try {
      const userExists = await this.__prismaService.user.findUnique({
        where: {
          email: createUserDto.email,
        },
      });

      if (userExists) {
        throw new UnprocessableEntityException('El usuario ya existe');
      }

      const newUser = await this.__prismaService.user.create({
        data: {
          email: email.toLowerCase(),
          ...rest,
        },
      });
      return {
        ok: true,
        user: newUser,
        message: 'usuario creado con exito',
      };
    } catch (error) {
      if (error.status === 422) {
        throw new UnprocessableEntityException('El usuario ya existe');
      }
      throw new BadRequestException('No se pudo crear el usuario');
    }
  }

  async findAll() {
    try {
      const users = await this.__prismaService.user.findMany();
      return {
        ok: true,
        users,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('No se pudieron cargar los usuarios');
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.__prismaService.user.findFirst({
        where: {
          id,
        },
      });

      if (!user) {
        throw new NotFoundException('El usuario no existe');
      }

      return {
        ok: true,
        user,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('No se pudo cargar el usuario o existe');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const { email, ...rest } = updateUserDto;
      const userExist = await this.findOne(id);

      const userUpdate = await this.__prismaService.user.update({
        where: {
          id,
        },
        data: {
          email: email?.toLowerCase(),
          ...rest,
        },
      });

      return {
        ok: true,
        user: userUpdate,
        message: 'usuario actualizado con exito',
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'No se pudo actualizar el usuario',
      );
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id);

      await this.__prismaService.user.delete({
        where: {
          id,
        },
      });

      return {
        ok: true,
        message: 'usuario eliminado con exito',
      };
    } catch (error) {
      throw new InternalServerErrorException('No se pudo eliminar el usuario');
    }
  }
}

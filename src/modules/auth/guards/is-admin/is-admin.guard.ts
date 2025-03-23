import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class IsAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request['user'];
    console.log(user);
    if (user.rol !== 'ADMIN') {
      throw new UnauthorizedException(
        'Accion denegada, contacte con el administrador',
      );
    }

    return true;
  }
}

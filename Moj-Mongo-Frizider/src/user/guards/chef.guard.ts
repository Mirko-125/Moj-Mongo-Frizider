import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ChefGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const isGetMethod = req.method === 'GET';
    const isPutMethod = req.method === 'PUT';
    return req.session.isChef || isGetMethod || isPutMethod;
  }
}
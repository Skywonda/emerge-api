import { Injectable } from "@nestjs/common";
import { AuthGuard, IAuthGuard } from "@nestjs/passport";


@Injectable()
export class JwtGuard extends AuthGuard('jwt') { }
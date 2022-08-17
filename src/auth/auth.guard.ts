import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard, IAuthGuard } from "@nestjs/passport";
import { Request } from "express";


@Injectable()
export class JwtGuard extends AuthGuard('jwt') { }
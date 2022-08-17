import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private config: ConfigService,
        private userService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.getOrThrow("ACCESS_TOKEN_SECRET"),
            ignoreExpiration: false,
        })
    }

    async validate(payload: any) {
        const user = await this.userService.findOne({ id: payload.userId })
        if (!user) {
            throw new UnauthorizedException()
        }
        return user
    }
}
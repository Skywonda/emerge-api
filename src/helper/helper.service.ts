import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as argon from "argon2"
@Injectable()
export class HelperService {
    constructor(
        private config: ConfigService,
        private jwtService: JwtService
    ) { }

    async hashPassword(password) {
        return await argon.hash(password)
    }
    async comparePassword(hashedPassword: string, plainPassword: string) {
        return await argon.verify(hashedPassword, plainPassword)
    }

    async generateAccessToken(userId: string) {
        const payload = {
            userId
        }
        const option: JwtSignOptions = {
            secret: this.config.getOrThrow("ACCESS_TOKEN_SECRET"),
        }
        return this.jwtService.sign(payload, option)
    }

    async decodeToken(token: string) {
        const option = {
            secret: this.config.getOrThrow("ACCESS_TOKEN_SECRET")
        }

        return this.jwtService.verify(token, option)
    }
}

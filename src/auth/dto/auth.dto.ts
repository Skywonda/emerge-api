import { IsNotEmpty } from "@nestjs/class-validator"

export class LoginDto {
    @IsNotEmpty()
    identity: string

    @IsNotEmpty()
    password: string
}
import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString } from "@nestjs/class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message: 'Username Cannot be empty' })
    @IsString({ message: "username must be a string" })
    username: string

    @IsNotEmpty({ message: 'Email Cannot be empty' })
    @IsEmail()
    email: string

    @IsNotEmpty({ message: "Password cannot be empty" })
    password: string
}

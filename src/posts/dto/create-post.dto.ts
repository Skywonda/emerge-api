import { isUUID } from "@nestjs/class-validator"
import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class CreatePostDto {
    @IsUUID()
    @IsNotEmpty()
    @IsString()
    authorId: string

    @IsNotEmpty()
    @IsString()
    content: string
}

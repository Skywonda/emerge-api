import { IsNotEmpty, IsString } from "class-validator"

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    authorId: string

    @IsNotEmpty()
    @IsString()
    content: string
}

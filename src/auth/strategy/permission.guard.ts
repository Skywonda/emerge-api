import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { PostsService } from "src/posts/posts.service";

@Injectable()
export class Authorize implements CanActivate {
    constructor(private postService: PostsService,
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = await context.switchToHttp().getRequest()
        const author = await (await this.postService.findOne({ id: request.params.id })).authorId
        const userType = request.user.user_type
        if (request.user.id === author || userType === "ADMIN" || userType === "SUPERADMIN") {
            return true
        }
        return false
    }
}

@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        const userType = request.user.user_type
        if (userType === "ADMIN" || userType === "SUPERADMIN") {
            return true
        }
        return false
    }
}
import { RolesBuilder } from "nest-access-control";

export enum UserRoles {
    Admin = "Admin",
    User = "User"
}

export const roles: RolesBuilder = new RolesBuilder()

roles.grant(UserRoles.User)
    .readAny(['posts'])
    .create(['posts'])
    .updateOwn(['posts'])
    .deleteOwn('posts')
    .grant(UserRoles.Admin)
    .extend(UserRoles.User)
    .updateAny(['posts'])
    .createAny(['posts'])
    .deleteAny(['posts'])
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HelperService } from 'src/helper/helper.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private helperService: HelperService
  ) { }
  async validateCrendentials(identity: string, password: string) {
    let user = await this.userService.findOne({ username: identity })
    if (!user) {
      user = await this.userService.findOne({ email: identity })
    }
    if (!user) {
      throw new UnauthorizedException()
    }
    const verifyPassword = await this.helperService.comparePassword(user.password, password)
    if (user && verifyPassword) {
      return user
    } {
      throw new UnauthorizedException('Invalid Credentials!')
    }
  }

  async login(data: any) {
    const user = await this.validateCrendentials(data.identity, data.password)
    if (!user) {
      throw new UnauthorizedException()
    }
    const token = await this.helperService.generateAccessToken(user.id)
    return { 'accessToken': token }
  }
}

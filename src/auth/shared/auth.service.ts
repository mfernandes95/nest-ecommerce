import { UserService } from '../../user/user.service'
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {

  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) { }

  async validateUser(userEmail: string, userPassword: string) {
    const user = await this.usersService.findByEmail(userEmail);
    // if (!user) throw new NotFoundException()


    if (await this.comparePassword(user.password, userPassword)) {
      const { id, name, email } = user;
      return { id, name, email };
    }

    return null
  }

  login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private async comparePassword(attempt: string, password: string): Promise<boolean> {
    return await bcrypt.compare(password, attempt);
  }
}

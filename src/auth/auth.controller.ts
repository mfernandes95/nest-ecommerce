import { AuthService } from './shared/auth.service';
import { LocalAuthGuard } from './shared/local-auth.guard';
import { Controller, UseGuards, Request, Post, Patch, Param, Body } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Controller()
export class AuthController {

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('sessions')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Patch('/validate/:token')
  async confirmEmail(@Param('token') token: string) {
    await this.authService.confirmEmail(token);
    return {
      message: 'Email confirmado',
    };
  }

  @Post('/send-recover-email')
  async sendRecoverPasswordEmail(
    @Body('email') email: string,
  ): Promise<{ message: string }> {
    await this.authService.sendRecoverPasswordEmail(email);
    return {
      message: 'Foi enviado um email com instruções para resetar sua senha',
    };
  }
}


import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { LocalAuthGuard } from "src/auth/local-auth.guard";
import { Public } from "src/decorator/customize";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  handleLogin(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('profile1')
  getProfile1(@Request() req) {
    return req.user;
  }
}

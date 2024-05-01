import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dtos/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() userData: UserDto): Promise<{ token: string }> {
    return this.userService.signup(userData);
  }

  @Post('login')
  async login(@Body() userData: UserDto): Promise<{ token: string }> {
    return this.userService.login(userData);
  }
}

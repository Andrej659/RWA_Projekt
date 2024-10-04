import { Controller, Post, Get, Delete, Body, Param, Patch, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  @Post('register')
  register(@Body() body: { username: string, password: string }) {
    return this.usersService.register(body.username, body.password);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('/autorName/:autorId')
  async getAuthorName(@Param('autorId') autorId: number, @Request() req): Promise<string> {
    console.log(this.usersService.getAutorsName(autorId));
    return this.usersService.getAutorsName(autorId); // Assuming getAuthorName is a method in PostsService
  }
}

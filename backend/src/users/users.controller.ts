import { Controller, Post, Get, Delete, Body, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  register(@Body() body: { username: string, password: string }) {
    return this.usersService.register(body.username, body.password);
  }

  @Post('login')
  login(@Body() body: { username: string, password: string }) {
    return this.usersService.login(body.username, body.password);
  }

  @Get('logout')
  logout() {
    return this.usersService.logout();
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }
}

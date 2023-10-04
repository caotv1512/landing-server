import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './database/user.entity';
import { UserDto } from './dtos/user.dto';
import { LoginUserDto } from './dtos/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('')
  getAll() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  get(@Param() params) {
    return this.usersService.getUser(params.id);
  }

  @Post()
  create(@Body() user: UserDto) {
    return this.usersService.createUser(user);
  }

  @Put()
  update(@Body() user: UserDto) {
    return this.usersService.updateUser(user);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.usersService.deleteUser(params.id);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const result = await this.usersService.login(loginUserDto);
    if (!result) throw new UnauthorizedException('Invalid credentials');
    return result;
  }
}

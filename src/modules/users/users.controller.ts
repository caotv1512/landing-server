import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  UnauthorizedException,
  NotFoundException,
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
  async getOneUser(@Param('id') id: number) {
   return await this.usersService.getOne(id);
  }

  @Post()
  create(@Body() user: UserDto) {
    return this.usersService.createUser(user);
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() updateUserDto: UserDto) {
    try {
      return await this.usersService.updateUser(id, updateUserDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    try {
     return await this.usersService.deleteUser(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const result = await this.usersService.login(loginUserDto);
    if (!result) throw new UnauthorizedException('Invalid credentials');
    return result;
  }
}

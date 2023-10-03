import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './database/user.entity';
import { UserDto } from './dtos/user.dto';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get('')
  getAll() {
    console.log('ahuhiii');
    return this.service.getUsers();
  }

  @Get(':id')
  get(@Param() params) {
    return this.service.getUser(params.id);
  }

  @Post()
  create(@Body() user: UserDto) {
    return this.service.createUser(user);
  }

  @Put()
  update(@Body() user: UserDto) {
    return this.service.updateUser(user);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.service.deleteUser(params.id);
  }
}

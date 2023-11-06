import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './database/user.entity';
import { UserDto } from './dtos/user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { LoginUserDto } from './dtos/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  jwtSecret = process.env.JWT_SECRET; // Thay đổi key bằng một giá trị thực tế.

  async checkDuplicate(userCheckDto: UserDto) {
    const { username, email } = userCheckDto;
    const users = await this.getUsers();
    const isUsernameDuplicate = users.some(
      (user) => user.username === username,
    );
    const isEmailDuplicate = users.some((user) => user.email === email);
    if (isEmailDuplicate) {
      return {
        msg: 'Email already exists',
        status: 400,
      };
    }
    if (isUsernameDuplicate) {
      return {
        msg: 'Username already exists',
        status: 400,
      };
    }
    return false;
  }
  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getOne(id: number) {
    const user = await this.usersRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async createUser(user: UserDto) {
    const { username, email, password, role } = user;
    const hasPassword = await bcrypt.hash(password, 10);
    // console.log(user, 'user');
    
    const newUser = {
      username,
      email,
      password: hasPassword,
      role : +role,
    };
    // console.log(newUser, 'newUser');
    const checkDuplicate = await this.checkDuplicate(newUser);
    if (checkDuplicate) {
      return checkDuplicate;
    }
 
    
    this.usersRepository.create(newUser);
    await this.usersRepository.save(newUser);
    console.log(newUser, 'newUser');
    
    return {
      msg: 'User created successfully',
      status: 200,
      data: newUser,
    };
  }

  async login(loginUserDto: LoginUserDto) {
    console.log(loginUserDto, 'lllllllllllllll');
    
    const { username, password } = loginUserDto;
    const users = await this.getUsers();
    const user = users.find((u) => u.username === username);

    if (!user) {
      return false; // Người dùng không tồn tại
    }
    // So sánh mật khẩu đã được mã hóa với mật khẩu ban đầu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null; // Sai mật khẩu
    }
    const accessToken = jwt.sign({ username: user.username }, this.jwtSecret, {
      expiresIn: '1h', // Thời gian hết hạn của JWT
    });

    return {
      msg: 'Login successful',
      status: 200,
      data: {
        username: user.username,
        role: user.role,
        accessToken,
      },
    };
  }

  async updateUser(id: number, updateUserDto: UserDto) {
    const { username, password } = updateUserDto;
    const user = await this.usersRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    if (username) {
      const existingUser = await this.usersRepository.findOne({
        where: { username: username },
      });
      if (existingUser && existingUser.id !== user.id) {
        throw new ConflictException(
          `Username ${updateUserDto.username} is already in use`,
        );
      }
      user.username = username;
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Lưu thông tin người dùng đã cập nhật vào cơ sở dữ liệu
    await this.usersRepository.save(user);
    return {
      msg: 'User updated successfully',
      status: 200,
      data: user,
    };
  }

  async deleteUser(id: number) {
    const user = await this.usersRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    await this.usersRepository.remove(user);
    return {
      msg: 'User deleted successfully',
      status: 200,
    };
  }
}

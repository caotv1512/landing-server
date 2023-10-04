import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
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
    const { userName, email } = userCheckDto;
    const users = await this.getUsers();
    const isUsernameDuplicate = users.some(
      (user) => user.userName === userName,
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
    return false
  }
  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getUser(_id: number): Promise<User[]> {
    return await this.usersRepository.find({
      select: ['userName', 'email', 'role'],
      where: [{ id: _id }],
    });
  }

  async createUser(user: UserDto) {
    const { userName, email, password, role } = user;
    const hasPassword = await bcrypt.hash(password, 10);
    const newUser = {
      userName,
      email,
      password: hasPassword,
      role,
    }
    const checkDuplicate = await this.checkDuplicate(newUser);
    if (checkDuplicate) {
      return checkDuplicate;
    }
    this.usersRepository.create(newUser);
    await this.usersRepository.save(newUser);
    return {
      msg: 'User created successfully',
      status: 200,
      data: newUser,
    };
  }

  
  async login(loginUserDto: LoginUserDto){
    const { userName, password } = loginUserDto;
    const users = await this.getUsers();
    const user = users.find((u) => u.userName === userName);

    if (!user) {
      return false; // Người dùng không tồn tại
    }
    // So sánh mật khẩu đã được mã hóa với mật khẩu ban đầu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null; // Sai mật khẩu
    }
    const accessToken = jwt.sign({ username: user.userName }, this.jwtSecret, {
      expiresIn: '1h', // Thời gian hết hạn của JWT
    });
    
    return {
      msg: 'Login successful',
      status: 200,
      data:{
        username: user.userName,
        role: user.role, 
        accessToken,
      }
    };
  }

  async updateUser(user: UserDto) {
    this.usersRepository.save(user);
  }

  async deleteUser(user: User) {
    this.usersRepository.delete(user);
  }
}

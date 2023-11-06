import { IsString } from "class-validator";

export class UpdateUserDto {
    @IsString()
    username?: string;

    @IsString()
    password?: string;
    // Loại bỏ trường email hoặc bất kỳ trường nào bạn muốn ngăn cập nhật
  }
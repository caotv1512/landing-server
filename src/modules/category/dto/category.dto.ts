import { IsNumber, IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

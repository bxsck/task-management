import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'john123', description: 'User username' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'password123', description: 'User password' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'John Doe', description: 'User display name' })
  @IsNotEmpty()
  display_name?: string;
}

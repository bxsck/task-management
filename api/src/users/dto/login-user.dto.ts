import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'john123', description: 'User username' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'password123', description: 'User password' })
  @IsNotEmpty()
  password: string;
}

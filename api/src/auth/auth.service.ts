import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT access token',
  })
  access_token: string;

  @ApiProperty({
    description: 'User information',
    example: {
      id: '60d5ecb54f5f3a001f3e1234',
      username: 'John123',
      display_name: 'John Doe',
    },
  })
  user: {
    id: string;
    username: string;
    display_name?: string;
  };
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<LoginResponse> {
    const user = await this.usersService.findByUsername(loginUserDto.username);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.username,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        username: user.username,
        display_name: user.display_name,
      },
    };
  }
}

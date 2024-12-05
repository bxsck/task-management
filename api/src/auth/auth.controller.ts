import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: 201,
    description: 'Login successful',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            username: { type: 'string' },
            display_name: { type: 'string' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  async login(@Body(new ValidationPipe()) loginUserDto: LoginUserDto) {
    const result = await this.authService.login(loginUserDto);
    return {
      status: HttpStatus.CREATED,
      message: 'Login successful',
      data: result,
    };
  }
}

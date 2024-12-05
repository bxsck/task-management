import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/common/decorators/current-user.docorator';
import { User } from './user.entity';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  async register(@Body() createUserDto: CreateUserDto) {
    const result = await this.usersService.create(createUserDto);
    return {
      status: HttpStatus.OK,
      message: 'User registered successfully',
      data: result,
    };
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved',
    type: User,
  })
  async getProfile(@CurrentUser() user: any) {
    return user;
  }
}

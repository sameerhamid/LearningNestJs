import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { GoogelAuthGuard } from './guards/googel-auth/googel-auth.guard';
import { Response } from 'express';
import { Public } from './decrators/public.decrator';
import { Roles } from './decrators/roles.decrator';
import { RolesGuard } from './guards/roles/roles.guard';
import { Role } from '@prisma/client';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  regisetUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  loginUser(@Request() req) {
    console.log('calling>>>');
    return this.authService.login(req.user.id, req.user.name, req.user.role);
  }

  @Roles(Role.ADMIN, Role.EDITOR)
  // @UseGuards(RolesGuard)
  // @UseGuards(JwtAuthGuard)
  @Get('protected')
  getAll(@Request() req) {
    return {
      message:
        'now you can access the protected api. this is your user ID' +
        req.user.id,
    };
  }

  @Public()
  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user.id, req.user.name);
  }

  @Public()
  @UseGuards(GoogelAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @Public()
  @UseGuards(GoogelAuthGuard)
  @Get('google/callback')
  async googleCallback(@Request() req, @Res() res: Response) {
    const response = await this.authService.login(
      req.user.id,
      req.user.name,
      req.user.role,
    );
    res.redirect(
      `http://localhost:3000/api/auth/google/callback?userId=${response.id}&accessToken=${response.accessToken}&refreshToken=${response.refreshToken}&name=${response.name}&role=${response.role}`,
    );
  }

  @Post('signout')
  signOut(@Request() req) {
    return this.authService.singOut(req.user.id);
  }
}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { LocalStrategy } from './stratigies/local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/property/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './stratigies/jwt.strategy';
import refreshJwtConfig from './config/refresh-jwt.config';
import { RefreshJwtStrategy } from './stratigies/refresh.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from './guards/roles/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    UserModule,
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshJwtConfig),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, //@UseGuards(JwtAuthGuard) applied on all api endpoints
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AuthModule {}

import { Module, ValidationPipe } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { APP_PIPE } from '@nestjs/core';
import { PropertyService } from './property.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Property])],
  controllers: [PropertyController],

  //----global validation pipes
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
    PropertyService,
  ],
})
export class PropertyModule {}

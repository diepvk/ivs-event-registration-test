import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../common/auth/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../../common/auth/jwt-auth.guard';
import { Registration } from './registration.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [
    RegistrationService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [RegistrationController],
  imports: [
    TypeOrmModule.forFeature([Registration]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.EXPIRES_IN_SECONDS || 60 * 60 * 24 * 1000,
      },
    }),
  ],
  exports: [RegistrationService, TypeOrmModule],
})
export class RegistrationModule {}

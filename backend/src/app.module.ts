import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RegistrationModule } from './modules/registrations/registration.module';
import { SnakeNamingStrategy } from 'typeorm-snake-naming-strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RegistrationModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => {
        return {
          type: 'postgres',
          host: process.env.DATABASE_HOST,
          port: Number(process.env.DATABASE_PORT),
          username: process.env.DATABASE_USER,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
          entities: [
            __dirname + '/modules/**/*.entity{.ts,.js}',
            __dirname + '/modules/**/**/*.entity{.ts,.js}',
            __dirname + '/modules/**/**/**/*.entity{.ts,.js}',
          ],
          migrations: ['src/migrations/*.ts', 'dist/migrations/*{.ts,.js}'],
          cli: {
            migrationsDir: 'src/migrations',
          },
          namingStrategy: new SnakeNamingStrategy(),
          synchronize: process.env.SQL_SYNCHRONIZE === 'true',
          logging: process.env.SQL_LOGGING === 'true',
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
